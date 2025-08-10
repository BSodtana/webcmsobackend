const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { minioClientRW } = require('./minioClients');
const { s3 } = require('./config');
const path = require('path');
const fs = require('fs-extra');

// Point fluent-ffmpeg to the installed binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const BUCKET_PATH_PREFIX = 'cmso-it/hls';

exports.BUCKET_PATH_PREFIX = BUCKET_PATH_PREFIX;

/**
 * Transcodes an incoming video stream to HLS and uploads segments to S3.
 * @param {stream.Readable} inputStream - Stream of the uploaded video.
 * @param {string} videoId - A unique ID for this video.
 * @returns {Promise<string>} The S3 path to the master manifest file.
 */
exports.transcodeAndUploadHLS = async (inputStream, videoId) => {
  // Directory where ffmpeg will output temporary segments
  const outputDir = path.join('/tmp', videoId);
  await fs.ensureDir(outputDir);

  const manifestName = 'master.m3u8';
  const manifestPath = path.join(outputDir, manifestName);

  // Watch for segment files as they are created and upload/delete them immediately
  const uploadPromises = [];
  const watcher = fs.watch(outputDir, (eventType, filename) => {
    if (!filename || !filename.endsWith('.ts')) return;
    const localFile = path.join(outputDir, filename);

    const uploadPromise = (async () => {
      // Wait until the file is fully written
      while (!(await fs.pathExists(localFile))) {
        await new Promise((r) => setTimeout(r, 100));
      }
      const s3ObjectPath = `${BUCKET_PATH_PREFIX}/${videoId}/${filename}`;
      await minioClientRW.fPutObject(s3.bucketName, s3ObjectPath, localFile);
      await fs.remove(localFile);
    })().catch((err) => console.error('Segment upload error:', err));

    uploadPromises.push(uploadPromise);
  });

  return new Promise((resolve, reject) => {
    ffmpeg(inputStream)
      .outputOptions([
        '-c:v h264',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls',
      ])
      .output(manifestPath)
      .on('end', async () => {
        console.log('Transcoding finished successfully.');
        watcher.close();
        try {
          // Upload all generated files (.m3u8, .ts) to S3 in parallel
          const files = await fs.readdir(outputDir);
          await Promise.all(
            files.map(async (file) => {
              const localFile = path.join(outputDir, file);
              const s3ObjectPath = `${BUCKET_PATH_PREFIX}/${videoId}/${file}`;

              await minioClientRW.fPutObject(
                s3.bucketName,
                s3ObjectPath,
                localFile
              );

              // Remove each segment after successful upload to free disk space
              await fs.remove(localFile);
            })
          );

          console.log(`All HLS files for ${videoId} uploaded to S3.`);

          // Clean up temporary directories and original file
          await fs.remove(outputDir);
          if (typeof localFilePath === 'string' && localFilePath.length) {
          await fs.remove(localFilePath).catch(() => {});
          }

          const masterManifestS3Path = `${BUCKET_PATH_PREFIX}/${videoId}/${manifestName}`;
          resolve(masterManifestS3Path);
        } catch (uploadError) {
          reject(uploadError);
        }
      })
      .on('error', (err) => {
        watcher.close();
        console.error('Error during transcoding:', err);
        reject(err);
      })
      .run();
  });
};

/**
 * Fetches an existing object from S3 and pipes it into the HLS transcoder.
 * The file is streamed directly from S3 so it is never fully downloaded to
 * disk before being processed by ffmpeg.
 *
 * @param {string} objectPath - Full path of the source object inside the bucket.
 * @param {string} videoId - Unique identifier for the HLS output.
 * @returns {Promise<string>} S3 path to the generated master manifest.
 */
exports.transcodeFromS3 = async (objectPath, videoId) => {
  const objectStream = await minioClientRW.getObject(s3.bucketName, objectPath);
  return exports.transcodeAndUploadHLS(objectStream, videoId);
};

/**
 * Removes all HLS segments and manifests for a given video id. This can be used
 * as a cleanup step to reclaim storage once a stream is no longer required.
 *
 * @param {string} videoId - The video identifier whose HLS assets should be removed.
 */
exports.removeHlsOutput = async (videoId) => {
  const prefix = `${BUCKET_PATH_PREFIX}/${videoId}/`;
  const objects = [];

  const stream = minioClientRW.listObjectsV2(s3.bucketName, prefix, true);
  return new Promise((resolve, reject) => {
    stream.on('data', (obj) => objects.push(obj.name));
    stream.on('error', reject);
    stream.on('end', async () => {
      if (objects.length > 0) {
        await minioClientRW.removeObjects(s3.bucketName, objects);
      }
      resolve();
    });
  });
};