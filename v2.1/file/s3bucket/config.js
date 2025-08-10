require('dotenv').config();
module.exports = {
  s3: {
    accessKeyRO: process.env.S3_ACCESS_KEY_RO,
    secretKeyRO: process.env.S3_SECRET_KEY_RO,
    accessKeyRW: process.env.S3_ACCESS_KEY_RW,
    secretKeyRW: process.env.S3_SECRET_KEY_RW,
    bucketName: process.env.S3_BUCKET,
    urlEndpoint: process.env.S3_URL_ENDPOINT,
    urlExpires: parseInt(process.env.S3_URL_EXPIRES || "300"),
    region: process.env.S3_REGION,
    useSSL: process.env.S3_USE_SSL === 'true',
  },
};
