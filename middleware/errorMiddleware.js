require("dotenv").config()
const errorHandler=(err,req,res,next)=>
{
    err.status=err.status||"error";
    err.statusCode=err.statusCode||500
    
    if(process.env.Mode==="development")
        dev(err,res);
    else
        production(err,res);
}
const dev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        statusCode: err.statusCode,
        mass:err.message,
        stack:err.stack
    })
};

const production= (err,res)=>{
    res.send({
        status:err.status,
        mass:err.message,
    })}
module.exports=errorHandler;


