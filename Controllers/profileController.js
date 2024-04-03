const userService = require("../services/userService");
const {ProfileService,getUserForUpdateService}=require('../services/profileService')
const profileValidator = require('../validation/profile.validator');
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../Utils/CustomError");
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

         const { fname, lname, email, password ,image,address} = req.body;
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
const getUserForUpdate=expressAsyncHandler( async(req,res,next)=>{
    const user= await getUserForUpdateService(req.user._id);

    if(!user)
    {next(new CustomError('not found'),404)}
    else
    {
        res.send(user);
    }
})


module.exports = {
  getCurrentUser,
  updateProfile,getUserForUpdate
};
