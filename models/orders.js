const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
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
        paymentMethod:{
            type:String,
            enum:['cash','card'],
            default:'cash'
        },
        isPaid:{
            type:Boolean,
            default:false
        },
        paidAt:Date,
        isDelivred:{
            type:Boolean,
            default:false
        },
        shippingAddress:{
            details:String,
            phone:Number,
            city:String

        },
        delivred:Date}
        ,{timestamps:true}
)
const Order=mongoose.model('Order',orderSchema)
module.exports=Order