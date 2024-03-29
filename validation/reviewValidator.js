const { check } = require("express-validator")
const review = require("../models/review")
const validatMidelware = require("../middleware/validatorMidelware")


const createReviewValidator=[
    check('description').isString().optional(),
    check('ratting').notEmpty().withMessage("ratting required").isFloat({max:5,min:1}).withMessage('Ratting must between 1 and 5'),
    check('user').isMongoId().withMessage('invalid userID').notEmpty().withMessage("user required")
    .custom((val,{req})=>{
        if(req.user._id.toString()!==req.body.user.toString())
        {
            throw new Error('you must insert review with your userID only')
        }
        
        return true;
    }),
    check('product').isMongoId().withMessage('invalid productID').notEmpty().withMessage("product required")
    .custom(async(val,{req})=>{
        const Review=await review.findOne({user:req.user._id,product:req.body.product})
            if(Review)
            {
               throw new Error('you created review before')
            }   
            return true;
   
    }),    
    validatMidelware
];

const updateReviewValildator=[
    check('id').isMongoId().withMessage('invalid ID').notEmpty().withMessage('id required')
    .custom(async(val,{req})=>{
        const Review=await review.findById(val);
        if(!Review)
        {
            throw new Error(`there no review with id: ${val}`)
        }
        if(req.user._id.toString()!==Review.user._id.toString())
        {
            throw new Error(`you are not allowed to update this review`)
        }
            return true;
    }),
    check('description').isString().optional(),
    check('ratting').notEmpty().withMessage('ratting required').isNumeric({max:5,min:1}).withMessage('must between 1 and 5'),
    validatMidelware
];

const getReviewByIdValidator=[
    check('id').isMongoId().withMessage('invalid ID').notEmpty().withMessage('id is required')
    .custom(async(val,{req})=>{
        const Review=await review.findById(val);
        if(!Review)
        {
            throw new Error(`there no review with id: ${val}`)
        }
        return true;
    }),    validatMidelware

];
const deleteReviewByIdValidator=[
    check('id').isMongoId().withMessage('invalid ID').notEmpty().withMessage('id is required')
    .custom(async(val,{req})=>{
        const Review=await review.findById(val);
        if(!Review)
        {
            throw new Error(`there no review with id: ${val}`)
        }
        if(req.user.role==='user')
        {
            if(req.user._id.toString()!==Review.user._id.toString())
            {
                throw new Error(`you are not allowed to delete this review`)
            }
            return true;
        }
        return true;
    }),    validatMidelware
]




module.exports={createReviewValidator,updateReviewValildator,getReviewByIdValidator,deleteReviewByIdValidator}
