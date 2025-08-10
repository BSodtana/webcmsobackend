// VDO/s3Service.js

const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const { minioClientRO, minioClientRW } = require('./minioClients');
const { s3 } = require('./config');

// Define the required path prefix
const BUCKET_PATH_PREFIX = 'academic-cmso';

exports.uploadFile = async (buffer, originalName, mimeType) => {
  const ext = path.extname(originalName);
  const newFilename = `${uuidv4()}${ext}`;
  const today = dayjs().format('YYYY/MM');
  // Prepend the required path to the object name
  const objectName = `${BUCKET_PATH_PREFIX}/${today}/${newFilename}`;

  return new Promise((resolve, reject) => {
    minioClientRW.putObject(
      s3.bucketName,
      objectName, // Use the full path objectName
      buffer,
      buffer.length,
      { 'Content-Type': mimeType },
      (err, etag) => {
        if (err) return reject(err);
        resolve({
          objectName,
          // The public-facing URL might not need the prefix if CDN rules handle it.
          // Confirm this structure with your infrastructure admin.
          url: `${s3.urlEndpoint}/${s3.bucketName}/${objectName}`,
        });
      }
    );
  });
};
/**
 * Upload a readable stream to S3/MinIO.
 * @param {Readable} stream - Stream of file data.
 * @param {number} size - Total size of the stream in bytes.
 * @param {string} originalName - Original filename for extension.
 * @param {string} mimeType - MIME type of the file.
 * @returns {Promise<{objectName: string, url: string}>}
 */
exports.uploadFileStream = async (stream, size, originalName, mimeType) => {
  const ext = path.extname(originalName);
  const newFilename = `${uuidv4()}${ext}`;
  const today = dayjs().format('YYYY/MM');
  const objectName = `${BUCKET_PATH_PREFIX}/${today}/${newFilename}`;

  return new Promise((resolve, reject) => {
    minioClientRW.putObject(
      s3.bucketName,
      objectName,
      stream,
      size,
      { 'Content-Type': mimeType },
      (err, etag) => {
        if (err) return reject(err);
        resolve({
          objectName,
          url: `${s3.urlEndpoint}/${s3.bucketName}/${objectName}`,
        });
      }
    );
  });
};

exports.deleteFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    // IMPORTANT: Ensure fileName passed from the client includes the full path prefix.
    minioClientRW.removeObject(s3.bucketName, fileName, (err) => {
      if (err) {
        console.error("Delete error:", err);
        return reject(err);
      }
      console.log("Delete success:", fileName);
      resolve(true);
    });
  });
};

exports.getSignedUrl = (objectName) => {
  return new Promise((resolve, reject) => {
    // IMPORTANT: Ensure objectName passed from the client includes the full path prefix.
    minioClientRO.presignedGetObject(
      s3.bucketName,
      objectName,
      s3.urlExpires,
      (err, url) => {
        if (err) return reject(err);
        resolve(url);
      }
    );
  });
};

// Fetches an object from S3 and returns it as a Buffer.
// This helper is used by the streaming proxy to retrieve playlists and segments.
exports.getFile = (objectName) => {
  return new Promise((resolve, reject) => {
    minioClientRO.getObject(s3.bucketName, objectName, (err, stream) => {
      if (err) return reject(err);

      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  });
};
