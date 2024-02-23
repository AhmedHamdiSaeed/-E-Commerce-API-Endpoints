const errorHandler=(err,req,res,next)=>
{
    err.status=err.status||"error";
    err.statusCode=err.statusCode||500
    res.status(err.statusCode).json({
        status:err.status,
        statusCode: err.statusCode,
        mass:err.message,
        stack:err.stack
    });
}

module.exports=errorHandler;