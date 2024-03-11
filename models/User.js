const mongoose = require('mongoose');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const passwordRegex = /[a-zA-Z0-9]{6,}/;

const name = {
  type: String,
  required: true,
  minLength: 3,
  maxLength: 25,
};
const userSchema = new mongoose.Schema({
  fname: name,
  lname: name,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [emailRegex, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});


const User = mongoose.model('User', userSchema);
module.exports= User;