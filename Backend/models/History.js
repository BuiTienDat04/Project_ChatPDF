const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const translationSchema = new mongoose.Schema({
  language: { type: String, required: true },
  translatedContent: { type: String, required: true },
  translatedAt: { type: Date, default: Date.now },
});

const historySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  translations: [translationSchema],
  chatHistory: [chatMessageSchema],
  lastAccessed: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema);