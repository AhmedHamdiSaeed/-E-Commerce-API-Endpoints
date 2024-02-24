const joi= require('joi');

const newCartVaildatin=(cart)=>{
    const sehema= joi.object({
        productId: joi.string(),
        quantity: joi.number().integer().min(1)
    })
    return sehema.validate(cart)
} 

module.exports={
    newCartVaildatin 
}