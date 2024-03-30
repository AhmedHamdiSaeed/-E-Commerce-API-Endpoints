
const Order=require("../models/order")

const filterObject=(req,res,next)=>{
     filter={};
    if(req.user.role==='user')
    {
        console.log(req.user._id);
        filter={user:req.user._id};
        console.log("filter var",filter)
    }
    req.filterObj=filter;
    console.log("req.filterObj :  ",req.filterObj)
    
    next();
}
const getOrdersServise=async(filetrObj)=>{
    return await Order.find(filetrObj);
}
const getOrderByIdServise=async(orderId)=>{
    return await Order.findById(orderId)
}

module.exports={getOrdersServise,getOrderByIdServise,filterObject}