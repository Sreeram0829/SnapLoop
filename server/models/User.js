// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePicture: { type: String, default: 'default.jpg' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
