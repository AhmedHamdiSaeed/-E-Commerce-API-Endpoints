const userService = require("../services/userService");
const ProfileService=require('../services/profileService')
const profileValidator = require('../validation/profile.validator');
const bcrypt = require("bcrypt");
const getCurrentUser= async (req, res) => {
    try {
        console.log("userID",req.user._id)
         const user = await userService.findUserServiceProfile(req.user._id);
        if (!user) res.status(400).send("user not found");
        res.send(user);
    } catch (error) {
        res.status(404).send(error.message );
    }
};
const updateProfile = async (req, res) => {
    try {
        const { error } = profileValidator.validate(req.body);
        if (error) throw error;

         const { fname, lname, email, password } = req.body;
         const passwordHash = await bcrypt.hash(password, 10);
        const user = await ProfileService.updateProfile(req.params.id, {
          fname,
          lname,
          email,
          passwordHash
        });
        if (!user) throw new Error('User not found');

        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
  getCurrentUser,
  updateProfile,
};
