const express=require("express")
require("dotenv").config()
require("./db/connectionDB")
const Order=require("./models/orders")
const ordersRoute=require("./routes/ordersRoute")
const customError = require("./Utils/customError")
const errorHandler=require("./middleware/errorMiddleware")
const productRouter = require('./routes/productRoutes');
const  userRoutes = require('./routes/userRoutes');

const app=express();
app.use(express.json())

app.use('/api/v1', userRoutes);
app.use('/api/v1/products', productRouter);
app.use("/orders",ordersRoute)
app.all("*",(req,res,next)=>{
    next(new customError("can't found this route",500));
})
app.use(errorHandler);

app.listen(process.env.PORT,()=>console.log("running"))

////////////////// amal 









////////////////   radwa









////////// ahmed











///////////emad
