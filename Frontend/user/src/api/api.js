// src/api/api.js

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const ApiService = {
  // Gửi file PDF đến backend để phân tích
  analyzePDF: async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-pdf`, {
        method: 'POST',
        body: formData,
        // headers sẽ được tự động thiết lập bởi browser khi dùng FormData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      throw error;
    }
  },

  // Có thể thêm các API calls khác ở đây
  // Ví dụ:
  // getUserFiles: async (userId) => { ... },
  // saveTranslation: async (fileId, translation) => { ... },
};

export default ApiService;