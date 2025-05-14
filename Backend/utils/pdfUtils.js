const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const pdfjs = require('pdfjs-dist');
const { fromBuffer } = require('pdf2pic');
const { createWorker } = require('tesseract.js');
const path = require('path');
const os = require('os');

// Utility để giới hạn số lượng Promise thực thi đồng thời
class PromisePool {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent || os.cpus().length;
    this.currentConcurrent = 0;
    this.waiting = [];
  }

  async add(promiseFactory) {
    if (this.currentConcurrent >= this.maxConcurrent) {
      await new Promise(resolve => this.waiting.push(resolve));
    }
    this.currentConcurrent++;
    try {
      return await promiseFactory();
    } finally {
      this.currentConcurrent--;
      if (this.waiting.length > 0) {
        const next = this.waiting.shift();
        next();
      }
    }
  }
}

console.log('Loading pdfUtils.js, cMapUrl:', path.join(__dirname, '../../node_modules/pdfjs-dist/cmaps/'));

// Retry utility function
async function withRetry(fn, maxRetries = 2, delay = 500) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`Attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      lastError = error;
      if (attempt < maxRetries) {
        const backoffTime = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  throw lastError;
}

// Hàm kiểm tra header PDF
function validatePDFHeader(buffer) {
  if (!buffer || buffer.length < 4) return false;
  const header = buffer.toString('ascii', 0, 4);
  return header === '%PDF';
}

// Hàm xác thực buffer PDF
function validatePDFBuffer(buffer) {
  if (!buffer || buffer.length === 0) return 'Empty PDF buffer';
  if (!validatePDFHeader(buffer)) return 'Invalid PDF file format';
  if (buffer.length > 50 * 1024 * 1024) return 'PDF file too large (max 50MB)';
  return null;
}

// Hàm trích xuất văn bản có cấu trúc
async function extractTextWithStructure(pdfBuffer) {
  try {
    const pdf = await pdfjs.getDocument({
      data: pdfBuffer,
      disableWorker: true,
      useSystemFonts: true,
      cMapUrl: path.join(__dirname, '../../node_modules/pdfjs-dist/cmaps/'),
      cMapPacked: true,
      ignoreErrors: true, // Bỏ qua lỗi font TrueType
    }).promise;

    let fullText = '';
    const paragraphs = [];
    const pool = new PromisePool(Math.min(os.cpus().length, 8)); // Tối đa 8 trang đồng thời
    const pageResults = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      pageResults.push(pool.add(async () => {
        try {
          const page = await withRetry(() => pdf.getPage(i));
          const textContent = await withRetry(() => page.getTextContent());
          const pageItems = [...textContent.items];
          pageItems.sort((a, b) => b.transform[5] - a.transform[5]);

          let pageParagraphs = [];
          let pageText = '';
          let pageCurrentParagraph = '';
          let pageLastYPosition = null;

          pageItems.forEach((item) => {
            const text = item.str.trim();
            if (!text) return;
            const currentY = item.transform[5];

            if (pageLastYPosition !== null && Math.abs(pageLastYPosition - currentY) > 10) {
              if (pageCurrentParagraph.trim()) {
                pageParagraphs.push(pageCurrentParagraph.trim());
                pageText += pageCurrentParagraph.trim() + '\n\n';
                pageCurrentParagraph = '';
              }
            }
            pageCurrentParagraph += text + ' ';
            pageLastYPosition = currentY;
          });

          if (pageCurrentParagraph.trim()) {
            pageParagraphs.push(pageCurrentParagraph.trim());
            pageText += pageCurrentParagraph.trim() + '\n\n';
          }

          return {
            pageNumber: i,
            paragraphs: pageParagraphs,
            text: pageText,
          };
        } catch (error) {
          console.error(`Error processing page ${i}:`, error);
          return {
            pageNumber: i,
            paragraphs: [`[Error processing page ${i}: ${error.message}]`],
            text: `[Error processing page ${i}: ${error.message}]`,
          };
        }
      }));
    }

    const allPageResults = await Promise.all(pageResults);
    allPageResults.sort((a, b) => a.pageNumber - b.pageNumber);

    allPageResults.forEach(page => {
      fullText += page.text;
      paragraphs.push(...page.paragraphs);
    });

    fullText = fullText.replace(/\n{3,}/g, '\n\n').trim();

    return {
      text: fullText,
      paragraphs,
      pages: pdf.numPages,
    };
  } catch (error) {
    console.error('Text extraction error:', error);
    throw new Error(`Text extraction failed: ${error.message}`);
  }
}

// Hàm trích xuất ảnh từ PDF (bao gồm XObject và inline images)
async function extractImagesFromPDF(pdfBuffer, extractTextFromImages = false) {
  const validationError = validatePDFBuffer(pdfBuffer);
  if (validationError) throw new Error(validationError);

  let pdfDoc;
  try {
    pdfDoc = await withRetry(() => PDFDocument.load(pdfBuffer, { ignoreEncryption: true, throwOnInvalidObject: false }));
  } catch (err) {
    console.error("Error loading PDF with pdf-lib:", err);
    throw new Error(`PDF loading error: ${err.message}`);
  }

  const pdf = await withRetry(() => pdfjs.getDocument({
    data: pdfBuffer,
    disableWorker: true,
    cMapUrl: path.join(__dirname, '../../node_modules/pdfjs-dist/cmaps/'),
    cMapPacked: true,
    ignoreErrors: true,
  }).promise);

  const totalPages = pdf.numPages;
  console.log(`PDF has ${totalPages} pages and ${pdfDoc.getPageCount()} pages in pdf-lib`);

  const images = [];
  let errors = [];
  let processedCount = 0;
  const pool = new PromisePool(Math.min(os.cpus().length * 2, 16)); // Tăng tối đa 16 tác vụ đồng thời

  // Trích xuất XObject (sử dụng pdf-lib)
  const xObjectExtractPromises = [];
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    xObjectExtractPromises.push(pool.add(async () => {
      try {
        console.log(`Processing XObjects on page ${i + 1}/${pdfDoc.getPageCount()}`);
        const page = pdfDoc.getPage(i);
        const resources = page.node.Resources;
        if (!resources) return [];

        const xObjects = resources.XObject ? resources.XObject.rawObjs : {};
        const pageImages = [];

        for (const [name, xObject] of Object.entries(xObjects)) {
          if (xObject?.Subtype?.value === 'Image') {
            try {
              const imageBytes = xObject.rawStream?.content || xObject.rawData;
              if (!imageBytes || imageBytes.length === 0) continue;

              const imageBuffer = Buffer.from(imageBytes);
              const optimizedImage = await withRetry(() =>
                sharp(imageBuffer)
                  .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
                  .jpeg({ quality: 80 })
                  .toBuffer()
              );

              pageImages.push({
                pageNumber: i + 1,
                name,
                data: `data:image/jpeg;base64,${optimizedImage.toString('base64')}`,
                type: 'image/jpeg',
                dimensions: {
                  width: xObject.Width?.value || 0,
                  height: xObject.Height?.value || 0,
                },
                sizeKB: Math.round(optimizedImage.length / 1024),
                source: 'xobject',
              });

              processedCount++;
            } catch (err) {
              console.error(`XObject image processing error on page ${i + 1}, image ${name}:`, err);
              errors.push(`XObject error p${i + 1}: ${err.message}`);
            }
          }
        }
        return pageImages;
      } catch (err) {
        console.error(`Error processing XObjects on page ${i + 1}:`, err);
        errors.push(`Page ${i + 1} XObject extraction error: ${err.message}`);
        return [];
      }
    }));
  }

  // Trích xuất inline images (sử dụng pdfjs-dist)
  const inlineImageExtractPromises = [];
  for (let i = 1; i <= totalPages; i++) {
    inlineImageExtractPromises.push(pool.add(async () => {
      try {
        console.log(`Processing inline images on page ${i}/${totalPages}`);
        const page = await withRetry(() => pdf.getPage(i));
        const opList = await withRetry(() => page.getOperatorList());

        const inlineImages = opList.argsArray
          .filter((args, idx) => opList.fnArray[idx] === pdfjs.OPS.paintInlineImage)
          .map(args => args[0]);

        const pageImages = [];
        for (let j = 0; j < inlineImages.length; j++) {
          try {
            const imageData = inlineImages[j];
            if (!imageData || !imageData.data || imageData.data.length === 0) continue;

            const imageBytes = Buffer.from(imageData.data);
            const optimizedImage = await withRetry(() =>
              sharp(imageBytes)
                .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer()
            );

            pageImages.push({
              pageNumber: i,
              name: `inline_image_${i}_${j + 1}`,
              data: `data:image/jpeg;base64,${optimizedImage.toString('base64')}`,
              type: 'image/jpeg',
              dimensions: {
                width: imageData.width || 0,
                height: imageData.height || 0,
              },
              sizeKB: Math.round(optimizedImage.length / 1024),
              source: 'inline',
            });

            processedCount++;
          } catch (err) {
            console.error(`Inline image processing error on page ${i}, image ${j + 1}:`, err);
            errors.push(`Inline image error p${i} #${j + 1}: ${err.message}`);
          }
        }
        return pageImages;
      } catch (err) {
        console.error(`Error processing inline images on page ${i}:`, err);
        errors.push(`Page ${i} inline image extraction error: ${err.message}`);
        return [];
      }
    }));
  }

  // Chờ tất cả các promise hoàn thành
  const [xObjectResults, inlineImageResults] = await Promise.all([
    Promise.all(xObjectExtractPromises),
    Promise.all(inlineImageExtractPromises),
  ]);

  const allXObjectImages = xObjectResults.flat();
  const allInlineImages = inlineImageResults.flat();
  images.push(...allXObjectImages, ...allInlineImages);
  console.log(`Extracted ${images.length} images (${allXObjectImages.length} XObjects, ${allInlineImages.length} inline)`);

  // Fallback nếu không tìm thấy ảnh
  if (images.length === 0) {
    console.log('No embedded images found, falling back to page rendering...');
    const pageChunks = [];
    const chunkSize = 5;

    for (let i = 0; i < totalPages; i += chunkSize) {
      pageChunks.push({
        start: i + 1,
        end: Math.min(i + chunkSize, totalPages),
      });
    }

    console.log(`Split ${totalPages} pages into ${pageChunks.length} chunks for fallback rendering`);

    for (const chunk of pageChunks) {
      console.log(`Processing chunk of pages: ${chunk.start}-${chunk.end}`);
      try {
        const fallbackImages = await extractPagesAsImages(pdfBuffer, extractTextFromImages, chunk.start, chunk.end);
        if (fallbackImages.length === 0) {
          console.error(`No images extracted for chunk ${chunk.start}-${chunk.end}, stopping fallback`);
          break;
        }
        images.push(...fallbackImages);
      } catch (chunkError) {
        console.error(`Error processing chunk ${chunk.start}-${chunk.end}:`, chunkError);
        errors.push(`Chunk ${chunk.start}-${chunk.end} error: ${chunkError.message}`);
      }
    }
  }

  if (images.length > 0) {
    console.log(`Returning ${images.length} images from PDF`);
    return images;
  }

  if (errors.length > 0) {
    throw new Error(`Image extraction failed with errors: ${errors.join('; ')}`);
  }

  return [];
}

// Hàm phụ: Chuyển toàn bộ trang thành ảnh và (tùy chọn) trích xuất văn bản
async function extractPagesAsImages(pdfBuffer, extractText = false, startPage = 1, endPage = null) {
  try {
    const pdfDocument = await pdfjs.getDocument({ data: pdfBuffer, disableWorker: true }).promise;
    endPage = endPage || pdfDocument.numPages;
    console.log(`Extracting pages ${startPage}-${endPage} as images`);

    const options = {
      density: 100,
      format: 'jpeg',
      width: 800,
      height: 800,
    };

    const convert = fromBuffer(pdfBuffer, options);
    const images = [];
    let worker;

    if (extractText) {
      worker = await createWorker({ lang: 'eng+vie' });
    }

    const pool = new PromisePool(Math.min(os.cpus().length, 8));
    const pagePromises = [];

    for (let i = startPage; i <= endPage; i++) {
      pagePromises.push(pool.add(async () => {
        try {
          console.log(`Converting page ${i} to image`);
          const pageResult = await withRetry(() => convert.convert(i)); // Sửa cách gọi pdf2pic

          if (!pageResult || !pageResult.base64) {
            console.warn(`No image result for page ${i}`);
            return {
              pageNumber: i,
              name: `page_${i}`,
              data: null,
              error: 'No image data',
              source: 'error',
            };
          }

          const imageData = {
            pageNumber: i,
            name: `page_${i}`,
            data: `data:image/jpeg;base64,${pageResult.base64}`,
            type: 'image/jpeg',
            dimensions: { width: 800, height: 800 },
            sizeKB: Math.round(Buffer.from(pageResult.base64, 'base64').length / 1024),
            source: 'fallback',
          };

          if (extractText && worker) {
            const { data: { text } } = await withRetry(
              () => worker.recognize(Buffer.from(pageResult.base64, 'base64')),
              1, // Giảm retry cho OCR
              500
            );
            imageData.extractedText = text.trim();
          }

          return imageData;
        } catch (pageError) {
          console.error(`Error converting page ${i} to image:`, pageError);
          return {
            pageNumber: i,
            name: `page_${i}`,
            data: null,
            error: pageError.message,
            source: 'error',
          };
        }
      }));
    }

    const results = await Promise.all(pagePromises);
    images.push(...results.filter(img => img.data));

    if (worker) await worker.terminate();
    console.log(`Successfully extracted ${images.length} pages as images`);
    return images;
  } catch (error) {
    console.error('Page rendering error:', error);
    throw error;
  }
}

// Xuất các hàm để sử dụng
module.exports = {
  validatePDFHeader,
  validatePDFBuffer,
  extractTextWithStructure,
  extractImagesFromPDF,
};