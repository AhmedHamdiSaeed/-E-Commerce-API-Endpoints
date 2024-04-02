const mongoose=require("mongoose")

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"category required"],
        maxLength:[30,"too long category name"],
        minLength:[2,"too short category name"],       
        unique:[true,"must unique"]
    },
    slug:{
        type:String,
        lowercase:true
    },
  
    image:{
        type: String,
        default: 'uploads/category.jpg'
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Category",categorySchema)