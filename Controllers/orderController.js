// const  getOrdersService  = require("../services/categoryService");

const getOrdersService = require("../services/orderServices");


const getOreders = async (req, res) => {
    try {
      const Orders = await getOrdersService();
      res.json(Orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  module.exports  = getOreders ;