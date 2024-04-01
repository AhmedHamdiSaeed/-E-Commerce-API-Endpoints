const express=require("express")
const expressAsyncHandler = require("express-async-handler")
const router=express.Router()
const Category=require("../models/Category");
const {getCategory , CreateCategory} = require("../Controllers/CategoryController") ;

// router.route("/").get(expressAsyncHandler(async(req,res,next)=>{
//     const categories= await getCategory();
//     res.send(categories);
// }))

router.get('/' , getCategory) ;
router.post('/' , CreateCategory) ;

module.exports=router;