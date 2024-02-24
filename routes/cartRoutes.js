const express= require('express')
const router= express.Router();
const { auth } = require("../middleware/auth");
const { updateCartValidator,deleteCartValidator } = require("../validation/cartValdationExpress");

const { getCart,createNewCart ,updateCart,deleteOneCart,deleteAll} = require("../Controllers/cartController");

// Get the current user's shopping cart. 
router.get('/',auth,getCart)

// Add a product to the shopping 
router.post('/add',auth,createNewCart)

// Update a product in the shopping cart
router.patch('/update/:id',auth,updateCartValidator,updateCart)

// Remove a product from the shopping cart
router.delete('/remove/:id',auth,deleteCartValidator,deleteOneCart)

// Clear the entire shopping 
router.delete('/clare',auth,deleteAll)
module.exports=router; 