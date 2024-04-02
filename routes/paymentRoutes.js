const express=require("express");
const { checkoutSessionService } = require("../services/orderService");
const { auth } = require("../middleware/auth");
const { createOrder } = require("../Controllers/orderController");
const router=express.Router();


router.get("/checkout/:cartID",auth,checkoutSessionService)
router.get("/result",)
router.get("/success/:cartID",createOrder)    //go to ceate order and create payment documnet
module.exports=router;

