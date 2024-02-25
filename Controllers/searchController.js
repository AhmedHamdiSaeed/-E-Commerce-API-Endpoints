
const Product = require('../models/Product')
const searchProducts= async(req,res)=>{
    const { word } = req.query;
    try {
      let query = {};
      if (word) {
        query.$or = [
            { title: { $regex: word, $options: 'i' } },
            { description: { $regex: word, $options: 'i' } },
            { company: { $regex: word, $options: 'i' } }
        ];
      }
      const products = await Product.find(query);
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Not Found !!' });
    }
 }
module.exports ={searchProducts}