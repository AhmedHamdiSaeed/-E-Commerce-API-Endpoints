const User = require("../models/User");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers["jwt"];
    console.log(token) ;
    if (!token) return res.status(401).send({ message: "Unauthorized user" });

    // @ts-ignore
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email } = payload;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized user"  });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
};

module.exports = { auth };
