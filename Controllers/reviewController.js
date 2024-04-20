const AsyncHandler = require("express-async-handler");
const {getReviewsService,createReviewService,updateReviewService,getReviewByIdService,deleteReviewService}=require('../services/reviewService');

const getReviews=AsyncHandler(
    async(req,res,next)=>{
        const reviews=await getReviewsService(req);
        if(reviews.length===0)
        {
             res.send('empty');
             return;
        }
        res.send(reviews)
    }
)
const createReview=AsyncHandler(
   async (req,res,next)=>{
       const review= await createReviewService(req.body)
        res.json({
            "status": 200,
            "message": "Success",
            "data": 
             review      
          })
        return;
    }
)

const updateReview=AsyncHandler(
    async(req,res,next)=>{
      const review= await updateReviewService(req.params.id,req.body)
        res.json({
            "status": 200,
            "message": "Success",
            "data": 
             review      
          })
        return;
    }
)

const getReviewById=AsyncHandler(
    async(req,res,next)=>{
        const review=await getReviewByIdService(req.params.id,req);
        if(!review)
        {
            res.send('notfound this review')
        return;}
        res.send(review)
    }
)

const deleteReview=AsyncHandler(
    async(req,res,next)=>{
        await deleteReviewService(req.params.id);
        res.send('deleted')
    }
        )
module.exports={getReviews,createReview,updateReview,getReviewById,deleteReview}