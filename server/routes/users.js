// server/routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// @GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({
      ...user.toObject(),
      posts
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @PUT /api/users/me
router.put('/me', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const { fullName, username, bio } = req.body;
    const updateFields = { fullName, username, bio };

    if (req.file) {
      updateFields.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ msg: 'Failed to update profile' });
  }
});

module.exports = router;
