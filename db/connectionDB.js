// @ts-nocheck
const mongoose=require("mongoose")
require("dotenv").config()

const path = "mongodb+srv://user1:1111@e-commercedb.ibnxepr.mongodb.net/e-commercedb"

mongoose.connect(path).then(()=>console.log("connect ")).catch(()=>console.log("no connect"))

