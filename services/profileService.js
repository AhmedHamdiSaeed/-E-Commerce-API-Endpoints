const User = require('../models/User');

const createProfile = async userData => {
    return await User.create(userData);
};
const getUserForUpdateService=async(id)=>{
   return await User.findById(id).select('fname lname email password address image')
}
const updatedUser = {
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  password: { type: String },
  role:{type:String}
};

const updateProfileService = async (email, updatedUser) => {
  return await User.findByIdAndUpdate(email, updatedUser, {
    new: true,
  });
};

module.exports = {
  createProfile,
  updateProfileService,getUserForUpdateService
};
