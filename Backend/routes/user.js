const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Cập nhật thông tin người dùng
router.put('/update', async (req, res) => {
  try {
    const userId = req.user._id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;

module.exports = router;