const express = require('express');
const app = express();
const path = require('path');

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
