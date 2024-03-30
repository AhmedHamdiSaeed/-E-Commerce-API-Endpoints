const express = require("express");
require("dotenv").config();
require("./db/connectionDB");
const cors = require("cors");
const customError = require("./Utils/customError");
const errorHandler = require("./middleware/errorMiddleware");
 
const Cors = require("cors");
//
 
//routes
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoute = require("./routes/searchRoutes");
const cartRouter = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const CategoryRoutes = require("./routes/categoryRoutes");
const AdminRouter = require("./routes/adminRoutes");
const emailRoutes = require("./routes/contactRoutes");
const { auth } = require("./middleware/auth");
const { isAdmin } = require("./middleware/AdminUserAuth");
 
const app = express();
 
app.use(express.json());
app.use(cors());
 
app.use("/api/v1", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/userProfile",profileRoutes)
//cart route
app.use("/api/v1/cart", cartRouter);
 
app.use("/api/v1/search", searchRoute);
 
 app.use('/', emailRoutes);
////////////////// amal
 
/////////             heba
 
////////////////// aml
 
////////////////   radwa

////////// ahmed
 
app.use("/api/v1/orders", ordersRoutes);
 
///////////emad
app.use("/api/v1/category", CategoryRoutes);
 
app.use("/api/v1/admin", auth, AdminRouter);
 
app.all("*", (req, res, next) => {
  next(new customError("can't found this route", 500));
});
app.use(errorHandler);
 
app.listen(process.env.PORT, () => console.log("running"));
 
//ouside rejection
process.on("unhandledRejection", (err) => {
  // @ts-ignore
  console.log(`error: ${err.name} , message : ${err.message}`);
});