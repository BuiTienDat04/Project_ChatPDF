const { v1 } = require('@google-cloud/vision');
require('dotenv').config();

// Khởi tạo client Google Vision với key từ .env
const visionClient = new v1.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_VISION_KEY_PATH,
});

module.exports = visionClient;