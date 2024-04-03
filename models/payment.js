const mongoose=require("mongoose")

const paymentSchema=new mongoose.Schema(
    {
        orderId:{
            type:mongoose.Schema.ObjectId,
            ref:"Order"
        },
        status:{
            type:String,
            enum:['success','field'],
            required:true
         },
         totalPrice:Number,
         paidAt: {
            type: Date,
            default:Date.now()
          }
    }
    ,{timestamps:true}
)

Payment=mongoose.model('Payment',paymentSchema)
module.exports=Payment;