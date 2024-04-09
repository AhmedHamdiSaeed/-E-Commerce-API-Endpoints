const userService = require("../services/userService");
const {updateProfileService,getUserForUpdateService}=require('../services/profileService')
const profileValidator = require('../validation/profile.validator');
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../Utils/CustomError");
const User = require("../models/User");
const upload = require('./multerConfig') ;

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
         res.status(400).json({ message: 'No updates provided' });
      }
   



      upload(req, res, async (err) => {
      
            
            // Check if file is uploaded
            if (req.file) {
              // Save the uploaded image to the server
              const imagePath = req.file.path;
              console.log("image path : ",imagePath)
              updates.image = imagePath;
            }
            console.log('after',req.file.path)
      const userUpdated= await User.findByIdAndUpdate(req.user._id,updates,{new:true});
       res.json({
        "status": 200,
        "message": "updated",
        "data": 
        userUpdated      
      })   ;
      return;
})};
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
