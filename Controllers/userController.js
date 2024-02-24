const {
  findUserService
} = require("../services/userService");
const profileValidator=require("../validation/profile.validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { error } = profileValidator.validate(req.body);
    if (error) throw error;

    const { fname, lname, email, password, role } = req.body; 
    if (!email || !password)
      return res
        .status(422)
        .send({ message: "Please provide both email and password." });

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

    const user = await findUserService(email);
    if (!user)
      return res.status(401).send({ message: "Incorrect email or password." });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).send({ message: "Incorrect email or password." });

    const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1h" });
    res
      .header("jwt", token)
      .send({ token: token, message: "Access granted", user, email: email });
  } catch (error) {
    res
      .status(500)
      .send({
        message: error.message || "An error occurred while logging in.",
      });
  }
};

module.exports = {
  register,
  login,
};
