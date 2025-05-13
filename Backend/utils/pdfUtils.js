const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const { getDocument } = require('pdfjs-dist/legacy/build/pdf');

// Kiểm tra header PDF
function validatePDFHeader(buffer) {
  if (!buffer || buffer.length < 4) return false;
  const header = buffer.toString('ascii', 0, 4);
  return header === '%PDF';
}

// Kiểm tra buffer PDF
function validatePDFBuffer(buffer) {
  if (!buffer || buffer.length === 0) {
    return 'Empty PDF buffer';
  }
  if (!validatePDFHeader(buffer)) {
    return 'Invalid PDF file format';
  }
  if (buffer.length > 50 * 1024 * 1024) {
    return 'PDF file too large (max 50MB)';
  }
  return null;
}

// Trích xuất văn bản có cấu trúc
async function extractTextWithStructure(pdfBuffer) {
  const pdf = await getDocument({ data: pdfBuffer }).promise;
  let fullText = '';
  const paragraphs = [];
  let currentParagraph = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    textContent.items.forEach((item) => {
      const text = item.str;
      
      // Phát hiện đoạn văn mới
      if (/[.!?]\s*$/.test(text) || item.hasEOL) {
        if (currentParagraph.trim()) {
          currentParagraph += text;
          paragraphs.push(currentParagraph.trim());
          fullText += currentParagraph + '\n\n';
          currentParagraph = '';
        } else {
          fullText += text + '\n\n';
          paragraphs.push(text.trim());
        }
      } else {
        currentParagraph += text + ' ';
      }
    });
  }
  
  // Thêm đoạn cuối cùng nếu còn
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
    fullText += currentParagraph + '\n\n';
  }
  
  return {
    text: fullText.trim(),
    paragraphs,
    pages: pdf.numPages
  };
}

// Trích xuất ảnh từ PDF
async function extractImagesFromPDF(pdfBuffer) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const images = [];
    const imageProcessingPromises = [];
    
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
      const embeddedImages = await page.getEmbeddedImages();
      
      for (const [name, image] of Object.entries(embeddedImages)) {
        const processPromise = (async () => {
          try {
            const imageBytes = await image.embed();
            const optimizedImage = await sharp(imageBytes)
              .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 80 })
              .toBuffer();
            
            return {
              pageNumber: i + 1,
              name,
              data: optimizedImage.toString('base64'),
              type: 'image/jpeg',
              dimensions: { width: image.width, height: image.height },
              sizeKB: Math.round(optimizedImage.length / 1024)
            };
          } catch (err) {
            console.error(`Image processing error on page ${i + 1}:`, err);
            return null;
          }
        })();
        
        imageProcessingPromises.push(processPromise);
      }
    }
    
    const results = await Promise.all(imageProcessingPromises);
    return results.filter(img => img !== null);
    
  } catch (error) {
    console.error('PDF Image Extraction Error:', error);
    throw new Error('Failed to extract images from PDF');
  }
}

module.exports = {
  validatePDFHeader,
  validatePDFBuffer,
  extractTextWithStructure,
  extractImagesFromPDF
};