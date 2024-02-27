const express=require("express")
require("dotenv").config()
require("./db/connectionDB")
const customError = require("./Utils/customError")
const errorHandler=require("./middleware/errorMiddleware")


//
const Cart=require("./models/cart")

//routes
const userRoutes=require("./routes/userRoutes")
const profileRoutes=require("./routes/profileRoutes")
const productRoutes=require("./routes/productRoutes")
const ordersRoutes=require("./routes/ordersRoutes")
const CategoryRoutes=require("./routes/categoryRoutes")
const AdminRouter=require("./routes/adminRoutes")
const { auth } = require("./middleware/auth")

const app=express();
app.use(express.json())

app.use('/api/v1', userRoutes);
app.use('/api/v1/products', productRoutes);
app.all("*",(req,res,next)=>{
    next(new customError("can't found this route",500));
})
app.use(errorHandler);


////////////////// amal 




/////////             heba






////////////////// aml









////////////////   radwa









////////// ahmed


app.use("/orders",auth,ordersRoutes)
app.all("*",(req,res,next)=>{
    next(new customError("can't found this route",500));
})
app.use(errorHandler);







///////////emad
app.use("/category",CategoryRoutes)

app.use("/api/v1/admin",auth,AdminRouter)








app.listen(process.env.PORT,()=>console.log("running"))

//ouside rejection
process.on("unhandledRejection",(err)=>{
    console.log(`error: ${err.name} , message : ${err.message}`)
})