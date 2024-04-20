const express=require("express");
const router=express.Router();
const {createOrder,getOrdersByUserId,getOrderes,getOrderById,cancelOrder,updatePayStatus,updateDelivredStatus,getOrderByIdWithProducts}=require("../Controllers/orderController");
const {filterObject}=require('../services/orderService')
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/AdminUserAuth");


router.get("/",auth,filterObject,getOrderes)
router.post("/userOrders",auth,isAdmin,getOrdersByUserId) //get orders of a specific user by adimn
router.get('/products/:id',auth,getOrderByIdWithProducts)
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