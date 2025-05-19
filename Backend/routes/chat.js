const express = require('express');
const router = express.Router();
const { handleChatMessage } = require('../services/chatServices');

// Endpoint kiểm tra trạng thái chat
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Chat endpoint ready' });
});

// Endpoint gửi tin nhắn và nhận phản hồi từ Gemini
router.post('/message', async (req, res) => {
  try {
    const { fileId, sender, content } = req.body;

    if (!fileId || !sender || !content) {
      return res.status(400).json({
        success: false,
        error: 'Missing fileId, sender, or content',
        code: 'MISSING_FIELDS',
      });
    }

    const result = await handleChatMessage(fileId, sender, content, null);

    if (result.success) {
      res.json({
        success: true,
        message: 'Message processed',
        userMessage: result.userMessage,
        systemMessage: result.systemMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        errorMessage: result.errorMessage,
      });
    }
  } catch (error) {
    console.error('Lỗi xử lý tin nhắn qua HTTP:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      code: 'CHAT_PROCESSING_ERROR',
    });
  }
});

module.exports = router;