// @ts-nocheck
const mongoose=require("mongoose")
require("dotenv").config()
const path = "mongodb+srv://user1:1111@e-commercedb.ibnxepr.mongodb.net/e-commercedb" ;
// mongodb+srv://user1:1111@e-commercedb.ibnxepr.mongodb.net/e-commercedb
// const path = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1/newEco"
mongoose.connect(path).then(()=>console.log("connect ")).catch(()=>console.log("no connect"))

