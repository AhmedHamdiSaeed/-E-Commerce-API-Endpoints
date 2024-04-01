const stripe=require('stripe')(process.env.StripeSecret)
const AsyncHandler = require('express-async-handler');
const Order=require("../models/order");
const Cart = require('../models/cart');
const CustomError = require('../Utils/CustomError');




const checkoutSessionService=AsyncHandler(
    async(req,res,next)=>{


            const cart=await Cart.findById(req.params.cartID).populate('cartItems.product').exec();
            if(!cart)
            {
                next(new CustomError('not found this cart',404))
            }

            const items=cart.cartItems.map((item)=>{
                return {                  
                        price_data: {
                          currency: 'egp',
                          product_data: {
                            name: item.product.title,
                          },
                          unit_amount: item.price*100,
                        },
                        quantity: item.quantity,                     
                }
            })
            const session = await stripe.checkout.sessions.create({
            line_items: items,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: req.user.email,
            client_reference_id:req.params.cartID,
            metadata: {
                shipping_address: req.body.shipping_address,
            },
          });
          res.json({status:"success",session})
    }
)
const filterObject=(req,res,next)=>{
     filter={};
    if(req.user.role==='user')
    {
        console.log(req.user._id);
        filter={user:req.user._id};
        console.log("filter var",filter)
    }
    req.filterObj=filter;
    console.log("req.filterObj :  ",req.filterObj)
    
    next();
}
const getOrdersServise=async(filetrObj)=>{
    return await Order.find(filetrObj);
}
const getOrderByIdServise=async(orderId)=>{
    return await Order.findById(orderId)
}

module.exports={getOrdersServise,getOrderByIdServise,filterObject,checkoutSessionService}