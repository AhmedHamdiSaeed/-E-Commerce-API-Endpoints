const express = require('express');
const { isAdmin, isUser } = require('../middleware/AdminUserAuth');
const { auth } = require("../middleware/auth");
const router = express.Router();
const {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
} = require('../Controllers/productController');

router.get('/', auth,getProducts);
router.get('/:id', auth,  getProductById);
router.post('/', auth, isAdmin, createProduct);
router.patch('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router;
