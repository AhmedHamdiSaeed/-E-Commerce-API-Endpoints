const User = require('../models/User');

const createProfile = async userData => {
    return await User.create(userData);
};
const updatedUser = {
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  password: { type: String },
};
const updateProfile = async (email, updatedUser) => {
  return await User.findByIdAndUpdate(email, updatedUser, {
    new: true,
  });
};

module.exports = {
  createProfile,
  updateProfile
};
