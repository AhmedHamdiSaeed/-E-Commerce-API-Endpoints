const express=require("express");
const router=express.Router();
const asyncHandler=require("express-async-handler")
const Product=require("../models/Product")
const customError = require("../Utils/customError")

router.route("/").get(asyncHandler(async(req,res,next)=>{
    const products=await Product.find();
        res.send(products)
        
}))

module.exports=router