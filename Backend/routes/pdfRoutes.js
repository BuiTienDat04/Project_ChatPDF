const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const pdfController = require('../controllers/pdfController');
const rateLimit = require('express-rate-limit');

const analysisLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 10,
  message: {
    success: false,
    error: 'Too many PDF analysis requests, please try again later',
    code: 'RATE_LIMITED'
  }
});

router.post('/analyze', 
  analysisLimiter,
  upload,
  pdfController.analyzePDF
);

router.get('/status', (req, res) => {
  res.json({ 
    status: 'operational',
    version: '1.0.1',
    pdfAnalysis: true,
    maxFileSize: '50MB'
  });
});

module.exports = router;