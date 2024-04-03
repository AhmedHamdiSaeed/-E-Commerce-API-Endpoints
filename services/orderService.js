const stripe=require('stripe')(process.env.StripeSecret)
const AsyncHandler = require('express-async-handler');
const Order=require("../models/order");
const Cart = require('../models/cart');
const CustomError = require('../Utils/CustomError');



const getOrderByIdWithProductsService=async(id)=>{
        return await Order.findById(id).populate('cartItems.product').exec();
}
const checkoutSessionService=AsyncHandler(
    async(req,res,next)=>{


            const cart=await Cart.findById(req.params.cartID).populate('cartItems.product').exec();
            if(!cart)
            {
                next(new CustomError('not found this cart',404))
            }
            console.log("berfore create seesion cart :",cart)
            const items=cart.cartItems.map((item)=>{
                return {                  
                        price_data: {
                          currency: 'egp',
                          product_data: {
                            name: item.product.title,
                            images:[`${req.protocol}://${req.get('host')}/api/v1/images/${item.product.image}`],
                            description:item.product.description
                          },
                          unit_amount: item.price*100,
                        },
                        quantity: item.quantity,                     
                }
            })
            const session = await stripe.checkout.sessions.create({
            line_items: items,
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/api/v1/payment/success/${req.params.cartID}`,
            cancel_url: `http://localhost:4200/cart`,
            customer_email: req.user.email,
            client_reference_id:req.params.cartID,
         
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
    
    next();
}
const getOrdersServise=async(filetrObj)=>{
    return await Order.find(filetrObj).populate('user').populate('cartItems.product');
}
const getOrderByIdServise=async(orderId)=>{
    return await Order.findById(orderId)
}

module.exports={getOrdersServise,getOrderByIdServise,filterObject,checkoutSessionService,getOrderByIdWithProductsService}