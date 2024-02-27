
const express= require("express")
const router= express.Router();
const { auth } = require("../middleware/auth");
const { searchProducts } = require("../Controllers/searchController");

 router.get('/',auth,searchProducts)



module.exports=router; 
