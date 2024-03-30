
const asyncHander = require('express-async-handler');
const Cart = require('../models/cart');
const Product = require('../models/Product')
const User = require('../models/User')
const ApiError = require('../Utils/customError');
const {newCartVaildatin}=require('../validation/cart.validator');


const getCart= asyncHander(async(req,res)=>{
    //name -_id => remove id 
    console.log(req.user._id )
    const carts= await Cart.findOne({ user: req.user._id });
    res.send(carts);
});

//this is new 
// const createNewCart = asyncHander(async (req, res, next) => {
//     const products = req.body; 
//     const { email } = req.user;

   
//     for (const product of products) {
//         const { error } = newCartVaildatin(product);
//         if (error) {
//             return res.status(400).send({ message: error.details[0].message });
//         }
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         let cart = await Cart.findOne({ user: user._id });
//         if (!cart) {
//             cart = await Cart.create({ user: user._id, cartItems: [] });
//         }

//         for (const product of products) {
//             const { productId, quantity } = product;
//             const existingItem = cart.cartItems.find(item => item.product.toString() === productId);
//             const productInfo = await Product.findById(productId);

//             if (!productInfo) {
//                 return res.status(404).send({ message: `Product with ID ${productId} not found` });
//             }

//             if (existingItem) {
//                 existingItem.quantity += quantity;
//             } else {
//                 cart.cartItems.push({
//                     product: productInfo._id,
//                     title: productInfo.title,
//                     price: productInfo.price,
//                     quantity: quantity
//                 });
//             }
//         }

//         let totalPrice = 0;
//         cart.cartItems.forEach(item => {
//             totalPrice += item.quantity * item.price;
//         });
//         cart.totalprice = totalPrice;

//         await cart.save();

//         res.send({ numOfCartItems: cart.cartItems.length, data: cart });
//     } catch (error) {
//         return next(new ApiError('Internal Server Error', 500));
//     }
// });

const createNewCart = asyncHander(async (req, res, next) => {
    const products = req.body;
    const { email } = req.user;
  
    // Validate each product in the request body
    for (const product of products) {
      const { productId, quantity } = product;
      const { error } = newCartVaildatin(product);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const productInfo = await Product.findById(productId);
      if (!productInfo) {
        return res.status(404).send({ message: `Product with ID ${productId} not found` });
      }
  
      if (quantity > productInfo.quantity) {
        return res.status(400).send({ message: `Requested quantity exceeds available quantity for product with ID ${productId}` });
      }
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) {
        cart = await Cart.create({ user: user._id, cartItems: [] });
      }
  
      for (const product of products) {
        const { productId, quantity } = product;
        const existingItem = cart.cartItems.find(item => item.product.toString() === productId);
        const productInfo = await Product.findById(productId);
  
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.cartItems.push({
            product: productInfo._id,
            title: productInfo.title,
            price: productInfo.price,
            quantity: quantity
          });
        }
      }
  
      let totalPrice = 0;
      cart.cartItems.forEach(item => {
        totalPrice += item.quantity * item.price;
      });
      cart.totalprice = totalPrice;
  
      await cart.save();
  
      res.send({ numOfCartItems: cart.cartItems.length, data: cart });
    } catch (error) {
      return next(new ApiError('Internal Server Error', 500));
    }
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