const User = require("../models/User");

const createUserService = async ({ fname, lname, email, passwordHash }) => {
  try {
    return await User.create({ fname, lname, email, passwordHash });
  } catch (error) {
    console.log(error);
  }
};

const findUserService = async (email) => {
    return await User.findOne({ email });
};

module.exports = {
  createUserService,
    findUserService
};
