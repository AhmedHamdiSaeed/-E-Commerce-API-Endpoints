const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:[true,'user required']
    },
    cartItems:
        [
            {
                product:{
                    type:mongoose.Schema.ObjectId,
                    ref:"Product"
                },
                quantity:Number,
                price:Number
            },
        ],
    taxPrice:{
            type:Number,
            default:0
        },
    shippingPrice:{
            type:Number,
            default:0
        },
        totalOrderPrice:Number,
        isDelivred:{
            type:Boolean,
            default:false
        },
        status:{
            type:String,
            default:"pending"
        },
        shippingAddress:{
      type:String

        },
        delivredAt:Date}
        ,{timestamps:true}
)
const Order=mongoose.model('Order',orderSchema)
module.exports=Order