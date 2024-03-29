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
      },
    category: {
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        required: [true, 'Pleaze provide product "category" '],
      },
    company: {
        type: String,
        required: [true, 'Pleaze provide "company"'],
    },
    priceAfterDiscount:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    rattingsQuantity:{
        type:Number,
        default:0
    },
    rattingsAverage:{
        type:Number,
        default:0
    }
    ,
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          }
},{timestamps:true,toJSON:{ virtuals: true },
toObject: { virtuals: true } },);


productSchema.virtual('reviews',{
    ref:"Review",
    foreignField:"product",
    localField:"_id"
})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;