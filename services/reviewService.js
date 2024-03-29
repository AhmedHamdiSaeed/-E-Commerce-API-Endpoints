const Review = require('../models/review');

const setProductIdandUserIdInBody=(req,res,next)=>{
    if(req.params.productId)
    {
        req.body.product=req.params.productId
    }
    if(!req.body.user)
    {
        req.body.user=req.user._id
    }
    next()
}
const getReviewsService=async(req)=>{
    filter={};
    if(req.params.productId)
    {
        filter=req.filterObj
    }
  return await Review.find(filter)
}
const createfilterObject=(req,res,next)=>{
    filterObject={};
    if(req.params.productId)filterObject={product:req.params.productId}
    req.filterObj=filterObject;
    next();
}
const createReviewService=async(newReview)=>{
    await Review.create(newReview);
}

const updateReviewService=async(id,updatedData)=>{
    await Review.findByIdAndUpdate(id,updatedData,{new:true})
}
const getReviewByIdService=async(id,req)=>{
    filter={id};

    if(req.params.productId)
    {
        filter={_id:id,product:req.params.productId}
    }
    return await Review.findOne(filter)
}
    const deleteReviewService=async(id)=>{
    await Review.findByIdAndDelete(id);
}
module.exports={getReviewsService,createReviewService,updateReviewService,getReviewByIdService,deleteReviewService,createfilterObject,setProductIdandUserIdInBody};