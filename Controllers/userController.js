const {
  findUserService, getAllUserservices , deleteUSerServices
} = require("../services/userService");
const profileValidator=require("../validation/profile.validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AsyncHandler = require("express-async-handler");
const CustomError = require("../Utils/CustomError");


const register = async (req, res) => {
  try {
    const { error } = profileValidator.validate(req.body);
    if (error) throw error;

    const { fname, lname, email, password, role } = req.body; 
    if (!email || !password)
      return res
        .status(422)
        .send({ message: "Please provide both email and password." , body: req.body });

    const user = await findUserService(email);
    if (user)
      return res.status(409).send({
        message: "This email is already registered. Please choose another email.",
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fname,
      lname,
      email,
      password: passwordHash,
      role, 
    });
    res.send(newUser);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the user.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(422)
        .send({ message: "Please provide both email and password." });

    const user = await findUserService(email);console.log(user);
    if (!user)
      return res.status(401).send({ message: "Incorrect email or password." });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ message: "Incorrect email or password." });

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    res.send({ token: token, expiresIn: "1", message: "Access granted", user: user });
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occurred while logging in." });
  }
};



const getAllUsers = async (req , res , next)=>{
  try {
    const users = await getAllUserservices();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const deleteUser = AsyncHandler( async (req , res , next)=>{

  // @ts-ignore
  if (req.user.role !== 'admin') {
    throw new CustomError('Only admins can delete products', 403);
  }

  const user = await deleteUSerServices(req.params.userId)
  if (!user) {
    throw new CustomError(`No product with id: ${req.params.userId}`, 404);
  }
  res.json({ message: 'Product deleted successfully' });
  
})

const checkEmailController=AsyncHandler(
  async(req,res,next)=>{
    const {email}=req.body;
    console.log('email : ',email);
    const user=await User.findOne({email});
    console.log("useremail: ",user)
    if(!user)
    {
      res.json({
        "status": 200,
        "message": "notFound"  
      });
    }
    else{
      res.json({
        "status": 200,
        "message": "found",
        "data": 
          user.email   
      });
    }
  }
)

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
  checkEmailController
};
