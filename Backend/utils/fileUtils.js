const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

const tempDir = os.tmpdir();

async function saveTempFile(buffer) {
  const tempFileName = `${uuidv4()}.pdf`;
  const tempFilePath = path.join(tempDir, tempFileName);
  await fs.promises.writeFile(tempFilePath, buffer);
  return tempFilePath;
}

async function deleteTempFile(filePath) {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error('Failed to delete temp file:', err);
  }
}

module.exports = {
  saveTempFile,
  deleteTempFile
};