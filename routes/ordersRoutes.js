const express=require("express");
const router=express.Router();
const Order=require("../models/orders")
const asyncHandler=require("express-async-handler");
const customError = require("../Utils/customError");
const Cart = require("../models/cart");

router.route("/").get(asyncHandler(async(req,res,next)=>
{
    const orders=await Order.find();
    if(!orders)
        next(new customError("orders list is empty"))
    else
    res.send(orders)
}))

router.route("/:id").get(asyncHandler(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order)
        next(new customError("can't found this order",404));
    else
    res.send(order);
}))


router.post("/cartId",asyncHandler (async(req,res,next)=>{
    const cart= await Cart.findById(req.params.id);
    const taxPrice=0;
    const shippingPrice=0;
    const totalOrderPrice=cart.totalprice+taxPrice+shippingPrice;

    const order=await Order.create({
        user:req.user._id,
        cartItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
    })
}))
module.exports=router;