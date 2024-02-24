const Order=require("../models/orders")
const Cart=require("../models/cart");
const AsyncHandler = require("express-async-handler");



const createOrder=AsyncHandler(async(req,res,next)=>{
    const cart= await Cart.findById(req.params.cartId);
    const taxPrice=0;
    const shippingPrice=0;
    console.log(cart)
    const totalOrderPrice=cart.totalprice + taxPrice+shippingPrice;

    const order=await Order.create({
        user:req.user._id,
        cartItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
    })
    res.send(order)
})


module.exports={createOrder}