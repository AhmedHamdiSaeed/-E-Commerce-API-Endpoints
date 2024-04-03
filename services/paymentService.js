
const Payment=require('../models/payment')


const getPaymentByIdService= async(id)=>{
      return  await Payment.findById(id)

    }

module.exports={getPaymentByIdService}