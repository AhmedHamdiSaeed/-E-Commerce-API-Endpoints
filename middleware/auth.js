const User = require("../models/User");
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) =>{

    try{
        const token = req.headers["jwt"];
        if(!token) return res.status(401).send({message:"unauthorized user"});
        const payload = jwt.verify(token,"myjwtsecret")
        const {email} = payload;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send({message:"unauthorized user"});
        }
        next();
    }
    catch(error){
        return res.status(401).send({message:"unauthorized user"});
    }
}

module.exports = {auth};