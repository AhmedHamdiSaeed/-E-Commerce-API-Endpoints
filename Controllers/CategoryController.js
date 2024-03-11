const {getCategoryService, getCategoryByIdService} = require("../services/categoryService");

const CustomError = require('../Utils/customError');





const getCategory = async (req, res) => {
    try {
      const categories = await getCategoryService();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
const getCategoryById = async (req, res) => {
    try {
      const category = await getCategoryByIdService(req.params.id);
      if (!category) {
        throw new CustomError(`No product with id: ${req.params.id}`);
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getCategory,
    getCategoryById
  }