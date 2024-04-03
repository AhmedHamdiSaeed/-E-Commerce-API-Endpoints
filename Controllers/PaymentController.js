const expressAsyncHandler = require("express-async-handler")
const {  getPaymentByIdService } = require("../services/paymentService");
const CustomError = require("../Utils/CustomError");



const getPaymentByIdController=expressAsyncHandler(
    async(req,res,next)=>{
        const payment=await getPaymentByIdService(req.params.id);    
        if(!payment)
        next(new CustomError('not found',404))
        res.send(payment)
    }
)



module.exports={getPaymentByIdController}