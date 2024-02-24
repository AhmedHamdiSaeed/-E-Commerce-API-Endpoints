const express=require("express");
const router=express.Router();
const {createOrder}=require("../Controllers/orderController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/AdminUserAuth");



router.post("/:cartId",auth,createOrder)
module.exports=router;