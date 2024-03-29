const { getProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService , getProductByCategory } = require('../services/productService');
const CustomError = require('../Utils/CustomError');

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id,'reviews');
    if (!product) {
      throw new CustomError(`No product with id: ${req.params.id}`);
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // Assuming category id is passed in the request parameters
    const products = await getProductByCategory(categoryId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      throw new CustomError('Only admins can create products', 403);
    }

    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      throw new CustomError('Only admins can update products', 403);
    }

    const product = await updateProductService(req.params.id, req.body);
    if (!product) {
      throw new CustomError(`No product with id: ${req.params.id}`, 404);
    }
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      throw new CustomError('Only admins can delete products', 403);
    }

    const product = await deleteProductService(req.params.id);
    if (!product) {
      throw new CustomError(`No product with id: ${req.params.id}`, 404);
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductsByCategory
};
