const User = require("../models/User");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers["jwt"];
    if (!token) return res.status(401).send({ message: "Unauthorized user 1" });
    // @ts-ignore
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email } = payload;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized user 2"  });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user 3" });
  }
};

module.exports = { auth };
