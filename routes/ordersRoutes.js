const express=require("express");
const router=express.Router();
const {createOrder,getOrderes,getOrderById,cancelOrder,checkoutSession}=require("../Controllers/orderController");
const {filterObject}=require('../services/orderService')
const { auth } = require("../middleware/auth");


//Get a list of orders (admin only)
router.get("/",auth,filterObject,getOrderes)
//create order
router.post("/",auth,createOrder)
//Get details of a specific order.
router.get("/:id",auth,getOrderById)
//  Cancel an existing order
router.patch("/:id/cancel",auth,cancelOrder)
module.exports=router;