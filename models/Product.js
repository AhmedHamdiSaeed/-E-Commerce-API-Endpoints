const mongoose = require('mongoose');

const productSchema = new mongoose.Schema
({
    title: {
        type: String,
        required : [true , 'Pleaze provide product "name"'],
        maxlenght :[50 , "Name can't be more than 50 characters "],
    },
    quantity:{
        type:Number,
        required:[true,"quantity is required"]
    },
    price :
    {
        type :Number ,
        required : [true , 'Pleaze provide product "price"'],
        default : 100
    },
    description :
    {
        type :String,
        trim : true,
        required: [true , 'Pleaze provide product "description"'],
        maxlenght : [2000 ,"description can't be more than 2000 characters " ]
    },
    image :
    {
        type:String,
        default : '/images/1.jpg'
    },
    colors: {
        type: [String],
        default: ['#fffff'],
        required: true,
      },
      category: {
        type: String,
        required: [true, 'Pleaze provide product "category" '],
        enum:{
            values:  ['office','kitchen'],
            message: '{Value} is not supported'
        }
      },
      company: {
        type: String,
        required: [true, 'Pleaze provide "company"'],
        enum: {
          values: ['ikea', 'marcos'],
          message: '{Value} is not supported',
        }
    },
    priceAfterDiscount:{
        type:Number
    },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          }
} );

const Product = mongoose.model('Product', productSchema);

module.exports = Product;