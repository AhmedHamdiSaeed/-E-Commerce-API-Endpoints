class CustomError extends Error
{
    constructor(massage,statusCode)
    {
        super(massage);
        this.statusCode=statusCode||500;
        this.status=`${statusCode}`.startsWith(4)?"fail":"error";
    }
}

module.exports=CustomError;