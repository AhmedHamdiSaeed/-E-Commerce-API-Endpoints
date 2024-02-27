const express=require("express");
const router=express.Router();
const {createOrder,getOrderes,getOrderById,cancelOrder,checkoutSession}=require("../Controllers/orderController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/AdminUserAuth");


//Get a list of orders (admin only)
router.get("/",auth,isAdmin,getOrderes)
//create order
router.post("/",auth,createOrder)
//Get details of a specific order.
router.get("/:id",auth,getOrderById)
//  Cancel an existing order
router.patch("/:id/cancel",auth,cancelOrder)
//checkout session
router.get("/checkoutSession/:cartId",auth,checkoutSession)
module.exports=router;