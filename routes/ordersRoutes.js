const express=require("express");
const router=express.Router();
const {createOrder,getOrderes,getOrderById,cancelOrder,updatePayStatus,updateDelivredStatus}=require("../Controllers/orderController");
const {filterObject}=require('../services/orderService')
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/AdminUserAuth");


//Get a list of orders (admin only)
router.get("/",auth,filterObject,getOrderes)
//create order
router.post("/",auth,createOrder)
//Get details of a specific order.
router.get("/:id",auth,getOrderById)
//  Cancel an existing order
router.patch("/:id/cancel",auth,cancelOrder)             // edit in this api
//update pay status by admin
router.put("/:id/pay",auth,isAdmin,updatePayStatus)
//update Delivred status by Admin
router.put("/:id/Delivred",auth,isAdmin,updateDelivredStatus)

module.exports=router;