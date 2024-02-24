const mongoose=require("mongoose")
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"category required"],
        maxLength:[30,"too long category name"],
        minLength:[5,"too short category name"],       
        unique:[true,"must unique"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String
},
{timestamps:true}
)

module.exports=mongoose.model("Category",categorySchema)