const express = require('express');
const { isAdmin } = require('../middleware/AdminUserAuth');
const { auth } = require("../middleware/auth");
const router = express.Router();
const {
    getProducts,
   
} = require('../Controllers/productController');
const { getCategory } = require('../Controllers/CategoryController');
const {getOrderes} = require('../Controllers/orderController');
const { getAllUsers , deleteUser } = require('../Controllers/userController');

router.get('/products', auth, isAdmin ,getProducts);

router.get('/orders', auth, isAdmin ,getOrderes);

// @ts-ignore
router.get('/categories', auth, isAdmin ,getCategory);

router.get('/users', auth, isAdmin ,getAllUsers);

router.delete('/users/:userId', auth, isAdmin ,deleteUser);




module.exports = router;
