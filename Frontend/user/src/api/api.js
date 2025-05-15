export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const ApiService = {
  analyzePDF: async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      throw error;
    }
  },

  translatePDF: async (file, targetLang) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/Translatepdf?targetLang=${targetLang}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error translating PDF:', error);
      throw error;
    }
  },

  getPDFImages: async (fileId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pdf-images/${fileId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting PDF images:', error);
      throw error;
    }
  }
};

export default ApiService;