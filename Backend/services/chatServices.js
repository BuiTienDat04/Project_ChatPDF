const { callGeminiAPI } = require('../utils/chatUtils');

const handleChatMessage = async (fileId, sender, content) => {
  try {
    const userMessage = { fileId, sender, content, createdAt: new Date() };

    const response = await callGeminiAPI(content, null);
    const systemMessage = { fileId, sender: 'System', content: response, createdAt: new Date() };

    return { success: true, userMessage, systemMessage };
  } catch (error) {
    console.error('Lỗi xử lý tin nhắn:', error);

    const errorMessage = {
      fileId,
      sender: 'System',
      content: 'Xin lỗi, xảy ra lỗi khi xử lý tin nhắn.',
      createdAt: new Date(),
    };

    return { success: false, error: 'Failed to handle message', errorMessage };
  }
};

module.exports = { handleChatMessage };