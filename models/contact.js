// models/Email.js

const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
