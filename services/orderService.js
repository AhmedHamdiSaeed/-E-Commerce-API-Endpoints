require('dotenv').config();

const stripe = require('stripe')(process.env.StripeSecret);
const AsyncHandler = require('express-async-handler');
const Order = require("../models/order");
const Cart = require('../models/cart');
const CustomError = require('../Utils/CustomError');



const getOrderByIdWithProductsService = async (id) => {
    return await Order.findById(id).populate('cartItems.product').exec();
}

const checkoutSessionService = AsyncHandler(
    async (req, res, next) => {
        try {
            const cart = await Cart.findById(req.params.cartID).populate('cartItems.product').exec();
            if (!cart) {
                throw new CustomError('Cart not found', 404);
            }

            // console.log(`${req.protocol}://${req.get('host')}/api/v1/images/${item.product.image}`)

            // Construct line items for checkout session
            const items = cart.cartItems.map(item => ({
                price_data: {
                    currency: 'egp',
                    product_data: {
                        name: item.product.title,
                        //images: `${req.protocol}://${req.get('host')}/api/v1/images/${item.product.image}`,
                        description: item.product.description
                    },
                    unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
            }));

            const successURL = `${req.protocol}://${req.get('host')}/api/v1/payment/success/${req.params.cartID}`;
            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: 'payment',
                success_url: successURL,
                cancel_url: `http://localhost:4200/cart`,
                customer_email: req.user.email,
                client_reference_id: req.params.cartID,
            });

            res.json({ status: "success", session });
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error creating session:", error);

            // Pass the error to the error handling middleware
            next(error);
        }
    }
);

const filterObject = (req, res, next) => {
    filter = {};
    if (req.user.role === 'user') {
        console.log(req.user._id);
        filter = { user: req.user._id };
        console.log("filter var", filter)
    }
    req.filterObj = filter;

    next();
}
const getOrdersServise = async (filetrObj) => {
    return await Order.find(filetrObj).populate('user').populate('cartItems.product');
}

const getOrdersByUserIdServise = async (userId) => {
    return await Order.find({user: userId}).populate('user').populate('cartItems.product');
}
const getOrderByIdServise=async(orderId)=>{
    return await Order.findById(orderId).populate('user').populate('cartItems.product');
}

module.exports = { getOrdersServise,
     getOrderByIdServise,
      filterObject, 
      checkoutSessionService, 
      getOrderByIdWithProductsService,
      getOrdersByUserIdServise }