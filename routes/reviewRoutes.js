
const {createReview,getReviews,updateReview,getReviewById,deleteReview}=require('../Controllers/reviewController');
const express=require('express');
const { createReviewValidator ,updateReviewValildator,getReviewByIdValidator,deleteReviewByIdValidator} = require('../validation/reviewValidator');
const router=express.Router({mergeParams:true});
const {auth}=require('../middleware/auth');
const { createfilterObject ,setProductIdandUserIdInBody} = require('../services/reviewService');




router.get('/',createfilterObject,getReviews);
router.get('/:id',createfilterObject,getReviewByIdValidator,getReviewById);
router.post('/',auth,setProductIdandUserIdInBody,createReviewValidator,createReview);
router.put('/:id',auth,updateReviewValildator,updateReview);
router.delete('/:id',auth,deleteReviewByIdValidator,deleteReview)
module.exports=router