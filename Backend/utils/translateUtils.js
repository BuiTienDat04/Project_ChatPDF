require('dotenv').config();
const { performance } = require('perf_hooks');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Khởi tạo Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Debug API key
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Đã thiết lập' : 'Chưa thiết lập');

// Ánh xạ mã ngôn ngữ sang tên đầy đủ (ISO 639-1)
const languageMap = {
  en: 'English',
  vi: 'Vietnamese',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese (Simplified)',
  ru: 'Russian',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  ar: 'Arabic',
  hi: 'Hindi',
  th: 'Thai',
  nl: 'Dutch',
  sv: 'Swedish',
  pl: 'Polish',
  tr: 'Turkish',
};

/**
 * Dịch một đoạn văn bản với cơ chế thử lại khi gặp lỗi 429
 * @param {string} text - Văn bản cần dịch
 * @param {string} langName - Tên ngôn ngữ mục tiêu
 * @returns {Promise<string>} Văn bản đã dịch
 */
async function translateTextWithRetry(text, langName) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const prompt = `Translate the following text to ${langName} naturally and accurately:\n${text}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      if (error.status === 429) {
        attempt++;
        const retryDelay = error.errorDetails?.find(detail => detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay || '7s';
        const delayMs = parseInt(retryDelay) * 1000 || 7000; // Mặc định 7 giây nếu không có gợi ý
        console.log(`Quota exceeded, retrying (${attempt}/${maxRetries}) after ${delayMs/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        if (attempt === maxRetries) throw error;
      } else {
        throw error;
      }
    }
  }
}

/**
 * Dịch văn bản đã trích xuất từ PDF với xử lý đồng thời
 * @param {object} structuredText - Văn bản đã trích xuất từ PDF
 * @param {string} targetLang - Mã ngôn ngữ mục tiêu (ví dụ: 'en', 'vi')
 * @param {string} langName - Tên ngôn ngữ đầy đủ (ví dụ: 'English', 'Vietnamese')
 * @returns {Promise<object>} Văn bản đã dịch
 */
async function translatePDF(structuredText, targetLang = 'en', langName = 'English') {
  const startTime = performance.now();
  let warnings = [];

  // Chuẩn hóa mã ngôn ngữ
  targetLang = targetLang.toLowerCase();
  const effectiveLangName = languageMap[targetLang] || langName || targetLang;
  console.log(`Bắt đầu dịch sang ${effectiveLangName} (${targetLang})`);

  try {
    // Kiểm tra structuredText
    if (!structuredText || !structuredText.text) {
      warnings.push('Không có văn bản để dịch');
      console.log('Không tìm thấy văn bản trong structuredText');
      throw new Error('Không có văn bản để dịch');
    }

    // Dịch văn bản chính
    let translatedText = '';
    try {
      translatedText = await translateTextWithRetry(structuredText.text, effectiveLangName);
      console.log(`Kết quả dịch (text): ${translatedText.slice(0, 100)}...`);
    } catch (translationErr) {
      warnings.push(`Lỗi dịch văn bản sang ${effectiveLangName}: ${translationErr.message}`);
      console.error('Lỗi dịch:', translationErr);
      throw new Error(`Không thể dịch văn bản: ${translationErr.message}`);
    }

    // Dịch các đoạn văn với xử lý đồng thời
    let translatedParagraphs = [];
    const batchSize = 20; // Tăng lên 20 đoạn/lần để giảm số batch
    const paragraphBatches = [];

    for (let i = 0; i < structuredText.paragraphs.length; i += batchSize) {
      const batch = structuredText.paragraphs.slice(i, i + batchSize).filter(para => para);
      paragraphBatches.push(batch.join('\n\n'));
    }

    const maxConcurrentRequests = 3; // Giới hạn 3 yêu cầu đồng thời
    const batchPromises = [];
    for (let i = 0; i < paragraphBatches.length; i += maxConcurrentRequests) {
      const batchGroup = paragraphBatches.slice(i, i + maxConcurrentRequests);
      batchPromises.push(
        Promise.all(batchGroup.map(async (batch, index) => {
          console.log(`Dịch batch ${Math.floor(i / maxConcurrentRequests) + 1 + index}/${Math.ceil(paragraphBatches.length / maxConcurrentRequests)} sang ${effectiveLangName}`);
          const batchResult = await translateTextWithRetry(batch, effectiveLangName);
          return batchResult.split('\n\n');
        }))
      );
    }

    try {
      const allBatchResults = (await Promise.all(batchPromises)).flat();
      translatedParagraphs = allBatchResults.flat();
      console.log(`Đã dịch ${translatedParagraphs.length} đoạn văn sang ${effectiveLangName}`);
    } catch (translationErr) {
      warnings.push(`Lỗi dịch đoạn văn sang ${effectiveLangName}: ${translationErr.message}`);
      console.error('Lỗi dịch đoạn văn:', translationErr);
      throw new Error(`Không thể dịch đoạn văn: ${translationErr.message}`);
    }

    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    return {
      success: true,
      translatedContent: {
        text: translatedText,
        paragraphs: translatedParagraphs,
      },
      metadata: {
        processingTime: `${processingTime}s`,
        pages: structuredText.pages || 0,
        containsText: structuredText.text.length > 0,
        translatedLanguage: targetLang,
      },
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    console.error(`Lỗi dịch PDF sang ${effectiveLangName}:`, error);
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    warnings.push(`Lỗi dịch PDF: ${error.message}`);
    return {
      success: false,
      translatedContent: { text: '', paragraphs: [] },
      metadata: {
        processingTime: processingTime,
        pages: 0,
        containsText: false,
        translatedLanguage: targetLang,
      },
      warnings: warnings,
    };
  }
}

module.exports = { translatePDF, languageMap };