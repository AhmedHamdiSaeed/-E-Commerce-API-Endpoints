
const Product = require('../models/Product');

const getProductsService = async () => {
  return await Product.find();
};

const getProductByIdService = async (productId,populateopt) => {
  let query=Product.findById(productId);
  if(populateopt)
  {
    query=query.populate(populateopt)
  }
  return await query
};

const getProductByCategory = async (categoryId) => {
  let query = {};
  if (categoryId) {
    query = { category: categoryId };
  }
  return await Product.find(query);
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
    deleteProductService,
    getProductByCategory
  };