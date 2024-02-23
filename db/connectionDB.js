const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.URL).then(()=>console.log("connect")).catch(()=>console.log("no connect"))