
const asyncHander = require('express-async-handler');
const Cart = require('../models/cart');
const Product = require('../models/Product')
const User = require('../models/User')
const ApiError = require('../Utils/CustomError');
const {newCartVaildatin}=require('../validation/cart.validator');


const getCart= asyncHander(async(req,res)=>{
    //name -_id => remove id 
    console.log(req.user._id )
    const carts= await Cart.findOne({ user: req.user._id });
    res.send(carts);
});

const createNewCart =asyncHander( async (req, res,next) => {
        const { productId,quantity } = req.body;
        const { email } = req.user;
        // Validate the request body
        const { error } = newCartVaildatin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
       
        // Find the product by its ID
        const product = await Product.findById(productId);
        console.log(`product ${product}`);
        if (!product) {
           
            return res.status(404).send({ message: 'Product not found' });
        }

        // Find the user's cart or create a new one
        
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).send({ message: 'User not found' });
        }
        console.log(`req.user ${user._id }`);
        let cart = await Cart.findOne({ user:user._id });
        if (!cart) {
            cart = await Cart.create({
                user: user._id ,
                cartItems: [{product: product._id, titel: product.title , price: product.price,quantity:quantity  }]
            });
        } else {
            //find index of product in cart
            const productIndex  = cart.cartItems.findIndex(item =>
                 item.product.toString() === productId)
              console.log(productIndex )
              if(productIndex>-1){
                cart.cartItems[productIndex].quantity +=quantity;
              }else{
                cart.cartItems.push({product: product._id, titel: product.title , price: product.price ,quantity});
              }
            // calculate total price of product
            let totalPrice=0;
            cart.cartItems.forEach(element => {
                totalPrice += element.quantity * element.price 
            });
            cart.totalprice=totalPrice;
            await cart.save();
            }

        res.send({ numOfCartItems: cart.cartItems.length, data:cart});
});

const updateCart=asyncHander(async(req,res,next)=>{
   
        const { quantity } = req.body;
       
        // Find the product by its ID
        console.log(req.params.id)
      
        const product = await Product.findById(req.params.id);
        console.log(product)
        if (!product) {
            return next(new ApiError('Product not found',404))
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return next(new ApiError('Cart not found',404))

        }
            //find index of product in cart
            const cartItem  = cart.cartItems.find(item =>
                 item.product.toString() === req.params. id)
              console.log(cartItem )
              if (!cartItem) {
                return next(new ApiError('Product not found in cart',404))
              
            } 
            // Update the cart item with the new quantity
            cartItem.quantity = quantity;
           // calculate total price of product
           let totalPrice=0;
           cart.cartItems.forEach(element => {
               totalPrice += element.quantity * element.price 
           });
           cart.totalprice=totalPrice;
            await cart.save();
            res.send({ numOfCartItems: cart.cartItems.length, data:cart});
});

const deleteOneCart=asyncHander(async(req,res,next)=>{
    
    const email=req.user.email
    console.log(req.user.email)
          // Find the product by its ID
          console.log(req.params.id)
        
          const product = await Product.findById(req.params.id);
          console.log(product)
          if (!product) {
            return next(new ApiError('Product not found',404))
          }
        // Find the user's cart or create a new one
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).send({ message: 'User not found' });
        }
        console.log(`req.user ${ user._id }`);
        let cart = await Cart.findOne({ user: user._id });
            if (!cart) {
                return next(new ApiError('Cart not found',404))
               
            }
        //find index of product in cart
                const itemtoRemove  = cart.cartItems.find(item =>
                    item.product.toString() === req.params.id)
                console.log(itemtoRemove )
                if (!itemtoRemove) {
                    return next(new ApiError('Product not found in cart',404))
                  } 

        // Delete the cart item
                cart.cartItems.splice(itemtoRemove,1)
        // calculate total price of product
            let totalPrice=0;
            cart.cartItems.forEach(element => {
                totalPrice += element.quantity * element.price 
            });
            cart.totalprice=totalPrice;
                await cart.save();
                res.send({ numOfCartItems: cart.cartItems.length, data:cart});
});
const deleteAll =asyncHander(async (req, res) => {
        // Find the user's cart and delete it
        const cart = await Cart.findOneAndDelete({ user: req.user._id });
        
        if (!cart) {
            return next(new ApiError('Cart not found',404))
           
        }

        res.send({ message: 'Cart deleted successfully' });
    
});

module.exports={
    getCart,
    createNewCart,
    updateCart,
    deleteOneCart,
    deleteAll
}