// VDO/minioClients.js

const Minio = require('minio');
const dotenv = require('dotenv');
dotenv.config();

// Directly use the hostname. No need for URL parsing if the .env variable is clean.
const endPoint = process.env.S3_URL_ENDPOINT.replace(/^https?:\/\//, '');

const minioClientRW = new Minio.Client({
  endPoint: endPoint,
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY_RW,
  secretKey: process.env.S3_SECRET_KEY_RW,
});

const minioClientRO = new Minio.Client({
  endPoint: endPoint,
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY_RO,
  secretKey: process.env.S3_SECRET_KEY_RO,
});

async function checkMinioConnection(client, label = 'MinIO') {
  try {
    // We are checking the root bucket. The path prefix is handled during object operations.
    const exists = await client.bucketExists(process.env.S3_BUCKET);
    if (exists) {
      console.log(`[✓] ${label} connected: Bucket '${process.env.S3_BUCKET}' exists.`);
    } else {
      console.error(`[✗] ${label} connected BUT bucket '${process.env.S3_BUCKET}' does not exist.`);
    }
  } catch (err) {
    console.error(`[✗] ${label} connection failed:`, err.message);
  }
}

checkMinioConnection(minioClientRW, 'MinIO RW');
checkMinioConnection(minioClientRO, 'MinIO RO');

module.exports = {
  minioClientRW,
  minioClientRO
};