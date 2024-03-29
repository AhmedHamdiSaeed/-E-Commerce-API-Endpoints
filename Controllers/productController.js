const { getProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService , getProductByCategory } = require('../services/productService');
const CustomError = require('../Utils/CustomError');

const multer = require('multer');
const path = require('path');
const fs = require('fs');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limiting file size to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image'); // 'image' should match the name attribute in your form field for image upload


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

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

  //  const imagePath =  product.image ;
  //  const imageFolder = 'uploads/'
  // const imageFile = path.join(imageFolder,imagePath)

  // fs.readFile(imageFile, (err , ImageData)=>{
  //   if(err){
  //     res.status(500).send('failed to read image file ');
  //     return ;
  //   }
  // })

  // const responsePackage = {
  //   product: product ,
  //   image: imageFile
  // }
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

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        try {
          // Extracting product details from request body
          const { title, quantity, price, description, colors, category, company  , sold} = req.body;
  
          // Check if file is uploaded
          if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
  
          // Save the uploaded image to the server
          const imagePath = req.file.path;
  
          // Create a new product with image path
          const newProduct = {
            title,
            quantity,
            price,
            description,
            image: imagePath, // Save the path to the image
            colors,
            category,
            company,
            sold
          };
  
          const product = await createProductService(newProduct);
          res.status(201).json(product);
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  }

   catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).json({ error: error.message });
   }}

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
