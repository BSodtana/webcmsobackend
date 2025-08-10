const express = require('express');
const Busboy = require('busboy');
const multer = require('multer');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile, getSignedUrl, uploadFileStream, getFile } = require('./s3service');
const router = express.Router();
const { Readable } = require('stream');
const { transcodeAndUploadHLS, transcodeFromS3, BUCKET_PATH_PREFIX } = require('./hlsService');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const uploadStatus = new Map();

// Allowed MIME types
const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];
const maxSize = parseInt(process.env.UPLOAD_MAX_SIZE_MB || '5') * 1024 * 1024;

const allowedVideoMimeTypes = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime'
];
const maxVideoSize = parseInt(process.env.VIDEO_UPLOAD_MAX_SIZE_MB || '1024') * 1024 * 1024;


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
});

router.use(express.urlencoded({ extended: true }));

/**
 * @description Uploads a file and returns its full S3 object path.
 * @returns {object} { message, path, url }
 * @response {string} path - The FULL object path. e.g., "academic-cmso/2025/08/your-file.pdf"
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const result = await uploadFile(file.buffer, file.originalname, file.mimetype);
    res.status(201).json({
      message: 'Upload success',
      // CRITICAL: The client MUST store this 'path' value.
      path: result.objectName,
      url: result.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @description Generates a temporary, viewable URL for a file.
 * @body {string} fileName - MUST be the FULL object path returned from the /upload endpoint.
 */
router.post('/get-file', async (req, res) => {
  try {
    const fileName = req.body.fileName;

    // --- 🐞 DEBUGGING LOG ---
    // This will show you exactly what the client is sending.
    // It should look like: "academic-cmso/YYYY/MM/some-uuid.ext"
    console.log(`[get-file] Received request for fileName: ${fileName}`);
    // --- END DEBUGGING LOG ---

    if (!fileName) {
      return res.status(400).json({ error: "Missing fileName in body" });
    }

    const url = await getSignedUrl(fileName);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @description Deletes a file from S3.
 * @body {string} fileName - MUST be the FULL object path returned from the /upload endpoint.
 */
router.post("/delete-file", async (req, res) => {
  try {
    const fileName = req.body.fileName;
    
    // --- 🐞 DEBUGGING LOG ---
    console.log(`[delete-file] Received request for fileName: ${fileName}`);
    // --- END DEBUGGING LOG ---

    if (!fileName) {
      return res.status(400).json({ error: "Missing fileName in body" });
    }
    await deleteFile(fileName);
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message || 'Internal server error.' });
});


/**
 * Streams a large video file directly to S3 using multipart upload.
 * @returns {object} { message, path, url }
 */
router.post('/upload-large', async (req, res) => {
  try {
    const bb = Busboy({ headers: req.headers, limits: { fileSize: maxVideoSize } });
    let uploadPromise = null;

    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      if (!allowedVideoMimeTypes.includes(mimeType)) {
        file.resume();
        uploadPromise = Promise.reject(new Error('Invalid file type.'));
        return;
      }
      uploadPromise = uploadFileStream(file, filename, mimeType);
    });

    bb.on('finish', async () => {
      if (!uploadPromise) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      try {
        const result = await uploadPromise;
        res.status(201).json({ message: 'Upload success', path: result.objectName, url: result.url });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    bb.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    req.pipe(bb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/upload-video', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const videoId = uuidv4();
  const manifestPath = `${BUCKET_PATH_PREFIX}/${videoId}/master.m3u8`;
  let tempFilePath;
  let uploadError;
  let fileProcessedPromise;
    // Initialize status so clients can poll for completion
  uploadStatus.set(videoId, { status: 'processing', manifestPath });
   busboy.on('file', (name, file, info) => {
    tempFilePath = path.join('/tmp', `${videoId}-${info.filename}`);
    const writeStream = fs.createWriteStream(tempFilePath);
    file.pipe(writeStream);

    fileProcessedPromise = new Promise((resolve) => {
      writeStream.on('close', () => {
        const args = ['-v', 'error', '-i', tempFilePath, '-t', '1', '-f', 'null', '-'];
        const ff = spawn(ffmpegInstaller.path, args);
        ff.on('close', (code) => {
          if (code !== 0) {
            uploadError = 'Uploaded file is not a valid video.';
            uploadStatus.set(videoId, { status: 'failed', error: uploadError });
            fs.unlink(tempFilePath, () => {});
            return resolve();
          }

          transcodeAndUploadHLS(tempFilePath, videoId)
            .then(() => {
              uploadStatus.set(videoId, { status: 'completed', manifestPath });
              console.log(`Video ${videoId} transcoded and uploaded to ${manifestPath}`);
            })
            .catch((err) => {
              uploadStatus.set(videoId, { status: 'failed', error: err.message });
              console.error('Upload/Transcode Error:', err);
            });
          resolve();
        });
      });
    });
    });

  busboy.on('error', (err) => {
    console.error('Busboy Error:', err);
    uploadStatus.set(videoId, { status: 'failed', error: 'Failed to upload video.' });
    res.status(500).json({ error: 'Failed to upload video.' });
  });

  busboy.on('finish', () => {
    const respond = () => {
      if (uploadError) {
        return res.status(400).json({ error: uploadError });
      }
      res.status(202).json({
        message: 'Video is processing and will be available shortly.',
        videoId,
        manifestPath,
      });
    };

    if (fileProcessedPromise) {
      fileProcessedPromise.then(respond);
    } else {
      respond();
    }
  });

  req.pipe(busboy);
});

// Allow clients to poll for transcoding status
router.get('/upload-status/:videoId', (req, res) => {
  const info = uploadStatus.get(req.params.videoId);
  if (!info) {
    return res.status(404).json({ error: 'Unknown videoId' });
  }
  res.json(info);
});

// Rewrite URI="..." attribute inside attribute lists
function rewriteAttrUri(req, baseDir, line, attrName) {
  const re = new RegExp(`${attrName}="([^"]+)"`, 'i');
  return line.replace(re, (_m, uri) => {
    if (isHttpUrl(uri)) return _m; // leave absolute
    const resolved = path.posix.join(baseDir, uri);
    return `${attrName}="${buildProxyUrl(req, resolved)}"`;
  });
}


// ---------- routes ----------

// Start a transcode job from an existing S3 object (unchanged behavior)
router.post('/transcode-from-s3', (req, res) => {
  try {
    const { objectPath, callbackUrl } = req.body;
    if (!objectPath) return res.status(400).json({ error: 'Missing objectPath in body' });

    const { v4: uuidv4 } = require('uuid');
    const videoId = uuidv4();
    const BUCKET_PATH_PREFIX = process.env.BUCKET_PATH_PREFIX || 'academic-cmso/hls';
    const manifestPath = `${BUCKET_PATH_PREFIX}/${videoId}/master.m3u8`;

    transcodeFromS3(objectPath, videoId, (progress) => {
      const percent = progress.percent ? progress.percent.toFixed(2) : '0';
      console.log(`Transcoding ${videoId}: ${percent}% at ${progress.timemark}`);
    })
      .then(async () => {
        console.log(`HLS output ready for ${videoId} at ${manifestPath}`);
        if (callbackUrl) {
          try {
            const url = await getSignedUrl(manifestPath);
            await require('axios').post(callbackUrl, { videoId, manifestPath, url });
            console.log(`Notification sent to ${callbackUrl} for ${videoId}`);
          } catch (callbackErr) {
            console.error('Callback notification failed:', callbackErr);
          }
        }
      })
      .catch((err) => console.error('Transcode-from-s3 Error:', err));

    return res.status(202).json({
      message: 'Transcode job started',
      videoId,
      manifestPath,
    });
  } catch (err) {
    console.error('Transcode-from-s3 Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Return a short-lived signed URL for a given manifest (unchanged behavior)



const isHttpUrl = (u) => /^https?:\/\//i.test(u);
const buildProxyUrl = (req, s3Key) =>
  `${req.protocol}://${req.get('host')}/api/feature/videos/stream?objectPath=${encodeURIComponent(
    s3Key
  )}`;



// Handle lines inside .m3u8
function rewritePlaylistLine(req, baseDir, line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#EXTM3U')) return line;

  // Tags with URI attributes
  if (/^#EXT-X-KEY/i.test(trimmed)) {
    return rewriteAttrUri(req, baseDir, line, 'URI');
  }
  if (/^#EXT-X-MAP/i.test(trimmed)) {
    return rewriteAttrUri(req, baseDir, line, 'URI');
  }
  // Master playlist alternate renditions
  if (/^#EXT-X-MEDIA/i.test(trimmed)) {
    // Only rewrite if URI="..." exists (not all MEDIA lines have URI)
    if (/URI="/i.test(trimmed)) return rewriteAttrUri(req, baseDir, line, 'URI');
    return line;
  }

  // Other tags: leave as-is
  if (trimmed.startsWith('#')) return line;

  // Bare URI (segment or variant playlist)
  if (isHttpUrl(trimmed)) return line; // already absolute
  const resolved = path.posix.join(baseDir, trimmed);
  return buildProxyUrl(req, resolved);
}

// ---------- routes ----------

// Start a transcode job from an existing S3 object (unchanged behavior)
router.post('/transcode-from-s3', (req, res) => {
  try {
    const { objectPath, callbackUrl } = req.body;
    if (!objectPath) return res.status(400).json({ error: 'Missing objectPath in body' });

    const { v4: uuidv4 } = require('uuid');
    const videoId = uuidv4();
    const BUCKET_PATH_PREFIX = process.env.BUCKET_PATH_PREFIX || 'academic-cmso/hls';
    const manifestPath = `${BUCKET_PATH_PREFIX}/${videoId}/master.m3u8`;

    transcodeFromS3(objectPath, videoId, (progress) => {
      const percent = progress.percent ? progress.percent.toFixed(2) : '0';
      console.log(`Transcoding ${videoId}: ${percent}% at ${progress.timemark}`);
    })
      .then(async () => {
        console.log(`HLS output ready for ${videoId} at ${manifestPath}`);
        if (callbackUrl) {
          try {
            const url = await getSignedUrl(manifestPath);
            await require('axios').post(callbackUrl, { videoId, manifestPath, url });
            console.log(`Notification sent to ${callbackUrl} for ${videoId}`);
          } catch (callbackErr) {
            console.error('Callback notification failed:', callbackErr);
          }
        }
      })
      .catch((err) => console.error('Transcode-from-s3 Error:', err));

    return res.status(202).json({
      message: 'Transcode job started',
      videoId,
      manifestPath,
    });
  } catch (err) {
    console.error('Transcode-from-s3 Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Return a short-lived signed URL for a given manifest (unchanged behavior)
router.post('/get-stream-url', async (req, res) => {
  try {
    const { manifestPath } = req.body;
    if (!manifestPath) return res.status(400).json({ error: 'Missing manifestPath in body' });

    const url = await getSignedUrl(manifestPath);
    return res.json({ url });

  } catch (err) {
    console.error('get-stream-url error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// HLS proxy / playlist rewriter
// HLS proxy / playlist rewriter
router.get('/stream', async (req, res) => {
  try {
    const { objectPath } = req.query;
    if (!objectPath) return res.status(400).json({ error: 'Missing objectPath query parameter' });

    // Fetch from S3 (Buffer)
    // Fetch from S3 (Buffer)
    const fileBuffer = await getFile(objectPath);

    if (objectPath.endsWith('.m3u8')) {
      // Rewrite internal URIs to absolute proxy URLs
      // Rewrite internal URIs to absolute proxy URLs
      const playlist = fileBuffer.toString('utf-8');
      const baseDir = path.posix.dirname(objectPath);

      const rewritten = playlist
        .split(/\r?\n/)
        .map((line) => rewritePlaylistLine(req, baseDir, line))
        .map((line) => rewritePlaylistLine(req, baseDir, line))
        .join('\n');

      res.set('Content-Type', 'application/vnd.apple.mpegurl');
      res.set('Cache-Control', 'no-store');
      return res.send(rewritten);
    }

    // Binary (segments, keys, init segments, etc.)
    // Binary (segments, keys, init segments, etc.)
    res.set('Content-Type', mime.lookup(objectPath) || 'application/octet-stream');
    res.set('Cache-Control', 'public, max-age=60');
    return res.send(fileBuffer);
  } catch (err) {
    console.error('Stream proxy error:', err);
    return res.status(500).json({ error: 'Failed to proxy stream' });
  }
});

module.exports = router;

