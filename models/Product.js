const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
        maxLength:[50,"must less than 50"],
        minLength:[5,"must greater than 5"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"product must have description"],
        minLength:[20,"musth greater than or equal 20"]
    },
    quantity:{
        type:Number,
        required:[true,"quantity is required"]
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        require:[true,"price required"]
        ,trim:true,
        maxLength:[20,"too long price"]
    },
    priceAfterDiscount:{
        type:Number
    },
    color:[String],
    imageCover:{
        type:String,
        required:[true,"must insert one image"],
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,"must belong to category"],
    },
    ratingsAverage:{
        type:Number,
        min:[1,"must insert above or equal 1"],
        max:[5,"must insert less or equal 5"]
    },
    ratingsQuantity:{
        type:Number,
        default:0
    }
},
{timestamps:true}
);



module.exports=mongoose.model("Product",productSchema)