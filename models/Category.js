const mongoose=require("mongoose")

const categorySchema= new mongoose.Schema({
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
    Products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }] ,
    image:String
},
{timestamps:true}
)

module.exports=mongoose.model("Category",categorySchema)