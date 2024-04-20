// @ts-nocheck
const Order=require("../models/order")
const Cart=require("../models/cart");
const AsyncHandler = require("express-async-handler");
const customError = require("../Utils/CustomError");
const Product = require("../models/Product");
const { getOrderByIdServise,getOrdersByUserIdServise,getOrdersServise,getOrderByIdWithProductsService} = require("../services/orderService");
const Payment = require("../models/payment");
const payment = require("../models/payment");
const User = require("../models/User");
require("dotenv").config()
const stripe= require('stripe')('sk_test_51OoAdfHKyTd2gxdff0ItjSCSspETGmOHRAdVfdWai1V9XgzUkfMoMeZDXPcqV6yFxq8GYeziBX5FLDXTYKgy30BZ00dh7Rbr7W');


const getOrderByIdWithProducts=AsyncHandler(
    async(req,res,next)=>{
       const order= await getOrderByIdWithProductsService(req.params.id);
        if(!order)
        {
            next(customError('not found',404))
        }
        res.send(order);
    }
)

const getOrdersByUserId = AsyncHandler(async (req , res , next)=>{
    const {userId} = req.body ; 
    const orders = await getOrdersByUserIdServise(userId)
    if(!orders)
    {
        next(customError('not found',404))
    }
    res.send(orders);
})
const createOrder=AsyncHandler(async(req,res,next)=>{
    const cartId=req.params.cartID;
    if(!cartId)
        return next("cartId required");
    //get cart by id
    const cart= await Cart.findById(req.params.cartID).populate('user').exec();;
    if(!cart)
        return next(new customError("can't found this cart",204));
    const taxPrice=0;
    const shippingPrice=0;
    const totalOrderPrice=cart.totalprice + taxPrice+shippingPrice;
    //create order
    console.log("inside createorder user :",cart.user.address)
    
    const order=await Order.create({
        user:cart.user,
        cartItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:cart.user.address //// set shipping address in user
    })

    //increment Sold and decrement quantity in Product
    const Bulkoption=cart.cartItems.map((item)=>({
        updateOne:{
            filter:{_id:item.product},update:{$inc:{quantity: -item.quantity,sold: +item.quantity}}
        }
    }));
    Product.bulkWrite(Bulkoption,{})

    //clear cart 
    await Cart.findByIdAndDelete(req.params.cartID)

    const payment=await Payment.create({
        orderId:order.id,
        status:'success',
        totalPrice:order.totalOrderPrice
    })
   
    res.redirect(`http://localhost:4200/paymentSuccess/${payment._id}`)
})

const getOrderes=AsyncHandler(async(req,res,next)=>{
    const orders= await getOrdersServise(req.filterObj);
    res.send(orders);
});


const getOrderById=AsyncHandler(async(req,res,next)=>{
    const orderId=req.params.id;
    if(!orderId)
        return next(new customError("orderId required")); 
    const order=await getOrderByIdServise(orderId);
    if(order.user.toString() ===req.user.id || req.user.role === 'admin')
        res.send(order)
    else
    return next(new customError("there is no such a order for this user"))       
})
const cancelOrder=AsyncHandler(async(req,res,next)=>{
    const orderId=req.params.id;
    if(!orderId)
        return next(new customError("orderId required")); 
    const order=await getOrderByIdServise(orderId);
    if(order.length==0)return next(new customError("there is no such a order "));
    if(order.user.toString()===req.user.id || req.user.role === 'admin')
    {
        order.status="Canceled";
          //decrement Sold and increment quantity in Product
    const Bulkoption=order.cartItems.map((item)=>({
        updateOne:{
            filter:{_id:item.product},update:{$inc:{quantity: +item.quantity,sold: -item.quantity}}
        }
    }));
    Product.bulkWrite(Bulkoption,{})

        const updatedOrder=await order.save();
        res.status(200).json({status:"success",data:updatedOrder})
    }
    else
        return next(new customError("there is no such an order for this user"));
 
})

const updatePayStatus=AsyncHandler(
    async(req,res,next)=>{
        const order=await getOrderByIdServise(req.params.id);
        if(!order)
         return next(new customError("there is no such an order for this OrderID"));
        order.isPaid=true;
        order.paidAt=Date.now();
       const updatedOrder= await order.save();
        res.status(201).json({
            success: true,
            message: 'order updated successfully',
            data: updatedOrder 
          });    
        }
)

const updateDelivredStatus=AsyncHandler(
    async(req,res,next)=>{
        const order=await getOrderByIdServise(req.params.id);
        if(!order)
         return next(new customError("there is no such an order for this OrderID"));
        order.isDelivred=true;
        order.delivredAt=Date.now();
       const updatedOrder= await order.save();
        res.status(201).json({
            success: true,
            message: 'order updated successfully',
            data: updatedOrder 
          });    
        }
)

module.exports={createOrder,getOrderes,getOrdersByUserId,getOrderById,cancelOrder,updatePayStatus,updateDelivredStatus,getOrderByIdWithProducts}