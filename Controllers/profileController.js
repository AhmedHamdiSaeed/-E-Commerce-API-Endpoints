const userService = require("../services/userService");
const {updateProfileService,getUserForUpdateService}=require('../services/profileService')
const profileValidator = require('../validation/profile.validator');
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../Utils/CustomError");
const User = require("../models/User");
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
    const updates=req.body

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No updates provided' });
      }
      let passwordHash=null;
      if(updates.password)
      {
        passwordHash = await bcrypt.hash(updates.password, 10);
        updates.password=passwordHash;
      }
      const userUpdated= await User.findByIdAndUpdate(req.user._id,updates,{new:true});
        res.json(userUpdated);
   
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
