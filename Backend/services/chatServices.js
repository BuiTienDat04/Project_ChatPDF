const { callGeminiAPI } = require('../utils/chatUtils');

const handleChatMessage = async (fileId, sender, content, io) => {
  try {
    const userMessage = { fileId, sender, content, createdAt: new Date() };

    // Nếu có io (Socket.IO), phát tin nhắn
    if (io) {
      io.to(fileId).emit('receiveMessage', userMessage);
    }

    // Gọi Gemini để lấy phản hồi
    const response = await callGeminiAPI(content, null);
    const systemMessage = { fileId, sender: 'System', content: response, createdAt: new Date() };

    // Nếu có io (Socket.IO), phát phản hồi
    if (io) {
      io.to(fileId).emit('receiveMessage', systemMessage);
    }

    // Trả về phản hồi cho cả HTTP và Socket.IO
    return { success: true, userMessage, systemMessage };
  } catch (error) {
    console.error('Lỗi xử lý tin nhắn:', error);

    const errorMessage = {
      fileId,
      sender: 'System',
      content: 'Xin lỗi, xảy ra lỗi khi xử lý tin nhắn.',
      createdAt: new Date(),
    };

    // Nếu có io (Socket.IO), phát lỗi
    if (io) {
      io.to(fileId).emit('receiveMessage', errorMessage);
    }

    return { success: false, error: 'Failed to handle message', errorMessage };
  }
};

module.exports = { handleChatMessage };