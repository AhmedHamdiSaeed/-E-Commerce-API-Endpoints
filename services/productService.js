
const Product = require('../models/Product');

const getProductsService = async () => {
  return await Product.find();
};

const getProductByIdService = async (productId) => {
  return await Product.findById(productId);
};

const createProductService = async (productData, userId) => {
  const product = new Product({ ...productData, user: userId });
  return await product.save();
};

const updateProductService = async (productId, updatedData) => {
  return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
};

const deleteProductService = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

module.exports = {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
  };