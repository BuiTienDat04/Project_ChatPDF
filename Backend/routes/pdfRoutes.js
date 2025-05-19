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
    error: 'Quá nhiều yêu cầu phân tích PDF, vui lòng thử lại sau',
    code: 'RATE_LIMITED'
  }
});

router.post('/analyze',
  analysisLimiter,
  upload,
  pdfController.analyzePDF
);

router.post('/Translatepdf',
  analysisLimiter,
  upload,
  (req, res, next) => {
    const targetLang = req.query.targetLang || req.body.targetLang || 'en';
    req.targetLang = targetLang;
    next();
  },
  pdfController.translatePDF
);

router.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    version: '1.0.1',
    pdfAnalysis: true,
    maxFileSize: '50MB',
    translation: true
  });
});

module.exports = router;