var mongoose=require('mongoose');
const User = require('./User');
const Product = require('./Product');


const reviewSchema= new mongoose.Schema(
{
    description:{type:String},
    ratting:
    {
    type:Number,
    required:true,
    max:[5,"max must 5"],
    min:[1,"min must 1"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:[true,'must write userID'],
    },
    product:
    {
        type:mongoose.Schema.ObjectId,
        required:[true,'must write ProductID'],
        ref:Product
    }
},{timestamps:true})   


reviewSchema.pre(/^find/,function(next){
    this.populate({path:'user',select:"fname lname "})
    next();
})

reviewSchema.statics.updateQuantityAndAvgRattings=async function(productId){
    console.log("inside static function",productId )
    const result =await this.aggregate([
        {
            $match:{product:productId}
        },
        {
            $group:{_id:'product',
                    rattingsQuantity:{$sum:1},
                    rattingsAvg:{$avg:'$ratting'}
            }
        }
    ])
    if(result.length>0)
    await Product.findByIdAndUpdate(productId,{rattingsQuantity:result[0].rattingsQuantity,rattingsAverage:result[0].rattingsAvg});
    else
    await Product.findByIdAndUpdate(productId,{rattingsQuantity:0,rattingsAverage:0});
};
reviewSchema.post('save',async function(){
     await this.constructor.updateQuantityAndAvgRattings(this.product);
});

reviewSchema.post('findOneAndDelete',async function(review){
     await review.constructor.updateQuantityAndAvgRattings(review.product) 
});

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;