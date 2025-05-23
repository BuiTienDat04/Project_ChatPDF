const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  picture: { type: String }, 
  birthday: { type: String }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  statusOnline: { type: Boolean, default: false },
  credits: { type: Number, default: 30 }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);