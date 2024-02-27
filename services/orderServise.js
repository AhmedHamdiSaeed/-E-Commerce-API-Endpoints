
const Order=require("../models/order")


const getOrdersServise=async()=>{
    return await Order.find();
}
const getOrderByIdServise=async(orderId)=>{
    return await Order.findById(orderId)
}


module.exports={getOrdersServise,getOrderByIdServise}