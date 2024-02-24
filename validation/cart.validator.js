const joi= require('joi');

const newCartVaildatin=(cart)=>{
    const sehema= joi.object({
        productId: joi.string()
    })
    return sehema.validate(cart)
} 

module.exports={
    newCartVaildatin 
}