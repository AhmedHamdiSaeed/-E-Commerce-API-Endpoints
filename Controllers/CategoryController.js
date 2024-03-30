const {getCategoryService, getCategoryByIdService , CreateCategoryService} = require("../services/categoryService");

const CustomError = require('../Utils/CustomError');
const AsyncHandler = require("express-async-handler");

const upload = require('./multerConfig') ;





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


  const CreateCategory = AsyncHandler( async (req , res ,next)=>{
    // @ts-ignore
    if (req.user.role !== 'admin') {
      throw new CustomError('Only admins can create products', 403);
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {

        const {name} = req.body ;
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const imagePath = req.file.path ;

       const newCategory = {
        name,
        imagePath
       }

        const category = await CreateCategoryService(newCategory)
        res.status(201).json(category);
      }
    })

  })
  module.exports = {
    getCategory,
    getCategoryById,
    CreateCategory
    
  }