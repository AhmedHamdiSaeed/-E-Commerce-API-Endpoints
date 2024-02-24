const { string } = require('joi')
const mongoose= require('mongoose')
const Product = require('../models/Product');
const User = require('../models/User');
const shoppingCartSchema=new mongoose.Schema({
cartItems:[{
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default: 1,
    },
    price:{
        type:Number,
    },

}],
totalprice:{
    type:Number,
   
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
,
},{ timestamps: true } )

const Cart= mongoose.model('Cart',shoppingCartSchema)
module.exports= Cart;