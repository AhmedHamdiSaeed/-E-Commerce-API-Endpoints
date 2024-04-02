const Category = require("../models/Category");



const getCategoryService = async () => {
    return await Category.find();
  };

  const getCategoryByIdService = async (CategoryId) => {
    return await Category.findById(CategoryId).populate('Products');
  };

const CreateCategoryService = async (categoryData)=>{
  return await Category.create(categoryData) ;
}

  module.exports = {getCategoryService, getCategoryByIdService , CreateCategoryService} ;