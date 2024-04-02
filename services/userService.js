const User = require("../models/User");
const createUserService = async ({ fname, lname, email, passwordHash, role }) => {
  try {
    return await User.create({ fname, lname, email, passwordHash, role }); 
  } catch (error) {
    console.log(error);
  }
};

const findUserServiceProfile = async (userID) => {
  return await User.findById(userID);
};


const findUserService = async (email) => {
  return await User.findOne({ email }).select('+password');
};

const getAllUserservices = async (email) => {
  return await User.find({'role': {$ne:'admin'}}) ;
};


const deleteUSerServices = async (userId)=>{
    return await User.findByIdAndDelete(userId) ;
}
module.exports = {
  createUserService,
  findUserService,
  getAllUserservices,
  deleteUSerServices ,
  findUserServiceProfile
};
