const express = require('express');
const { isAdmin } = require('../middleware/AdminUserAuth');
const { auth } = require("../middleware/auth");

const router = express.Router();
const reviewRoutes = require('../routes/reviewRoutes');
const {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
    getProductsByCategory
} = require('../Controllers/productController');

router.use('/:productId/reviews', reviewRoutes);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, isAdmin, createProduct); 
router.patch('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);
router.get('/category/:categoryId', getProductsByCategory);

module.exports = router;
