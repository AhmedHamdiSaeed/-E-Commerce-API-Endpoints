const express = require('express');
const { isAdmin } = require('../middleware/AdminUserAuth');
const { auth } = require("../middleware/auth");


const router = express.Router();
const {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
    getProductsByCategory
} = require('../Controllers/productController');

router.get('/',getProducts);
router.get('/:id',getProductById);
// @ts-ignore
router.post('/', auth, isAdmin,createProduct);
router.patch('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);
router.get('/category/:categoryId', getProductsByCategory);

module.exports = router;
