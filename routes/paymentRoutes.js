const express=require("express");
const { checkoutSessionService } = require("../services/orderService");
const { auth } = require("../middleware/auth");
const { createOrder } = require("../Controllers/orderController");
const {getPaymentByIdController}=require('../Controllers/PaymentController')
const router=express.Router();

router.get('/:id',getPaymentByIdController)
router.get("/checkout/:cartID",auth,checkoutSessionService)
// router.get("/result",)
router.get("/success/:cartID",createOrder)    //go to ceate order and create payment documnet
module.exports=router;

