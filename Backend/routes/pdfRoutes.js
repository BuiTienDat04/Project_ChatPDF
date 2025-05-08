// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const pdfController = require('../controllers/pdfController'); // Đảm bảo import đúng

// Sửa thành như sau
router.post('/analyze-pdf', upload, pdfController.analyzePDF);

module.exports = router;