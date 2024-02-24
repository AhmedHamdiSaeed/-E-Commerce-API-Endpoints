const express=require("express")
const expressAsyncHandler = require("express-async-handler")
const router=express.Router()
const Category=require("../models/Category")

router.route("/").get(expressAsyncHandler(async(req,res,next)=>{
    const categories= await Category.find();
    res.send(categories);
}))

module.exports=router;