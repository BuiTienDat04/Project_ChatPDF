const { GoogleGenerativeAI } = require('@google/generative-ai');

// Khởi tạo Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Gọi Gemini để xử lý tin nhắn
const callGeminiAPI = async (message, context) => {
  try {
    const prompt = context
      ? `Dựa trên nội dung sau:\n${context}\nNgười dùng hỏi: ${message}\nTrả lời:`
      : `Người dùng hỏi: ${message}\nTrả lời:`;

    console.log(`Prompt gửi đi: ${prompt.slice(0, 100)}...`);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log(`Kết quả từ Gemini: ${response.slice(0, 100)}...`);
    return response;
  } catch (error) {
    console.error('Lỗi gọi API Gemini:', error);
    return 'Xin lỗi, tôi không thể trả lời ngay bây giờ. Vui lòng thử lại sau!';
  }
};

// Export callGeminiAPI
module.exports = { callGeminiAPI };