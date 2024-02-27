// const Category = require("../models/Category");

const Order = require("../models/orders");



const getOrdersService = async () => {
    return await Order.find();
  };


  module.exports = getOrdersService ;