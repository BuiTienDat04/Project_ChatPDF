const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

async function extractImagesFromPDF(pdfBuffer) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const images = [];
    
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
      const embeddedImages = await page.getEmbeddedImages();
      
      for (const [name, image] of Object.entries(embeddedImages)) {
        try {
          const imageBytes = await image.embed();
          const optimizedImage = await sharp(imageBytes)
            .resize(800, 800, { fit: 'inside' })
            .toBuffer();
          
          images.push({
            pageNumber: i + 1,
            name,
            data: optimizedImage.toString('base64'),
            type: image.mimeType,
            dimensions: { width: image.width, height: image.height }
          });
        } catch (err) {
          console.error(`Error processing image on page ${i + 1}:`, err);
        }
      }
    }
    
    return images;
  } catch (error) {
    console.error('Error extracting images from PDF:', error);
    throw new Error('Failed to extract images from PDF');
  }
}

module.exports = { extractImagesFromPDF };