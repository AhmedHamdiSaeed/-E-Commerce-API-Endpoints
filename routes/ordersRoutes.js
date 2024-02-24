const express=require("express");
const router=express.Router();
const {createOrder,getOrderes,getOrderById,cancelOrder}=require("../Controllers/orderController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/AdminUserAuth");


//Get a list of orders (admin only)
router.get("/",auth,isAdmin,getOrderes)
//Get details of a specific order.
router.get("/:id",auth,getOrderById)
//create order
router.post("/",auth,createOrder)
//  Cancel an existing order
router.patch("/:id/cancel",auth,cancelOrder)
module.exports=router;