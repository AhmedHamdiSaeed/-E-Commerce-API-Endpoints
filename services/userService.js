const User = require("../models/User");
const createUserService = async ({ fname, lname, email, passwordHash, role }) => {
  try {
    return await User.create({ fname, lname, email, passwordHash, role }); 
  } catch (error) {
    console.log(error);
  }
};

const findUserService = async (email) => {
  return await User.findOne({ email }).select('+password');
};

const getAllUserservices = async (email) => {
  return await User.find();
};

module.exports = {
  createUserService,
  findUserService,
  getAllUserservices
};
