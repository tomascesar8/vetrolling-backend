const Product = require('../models/ProductModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json('Error al buscar productos');
  }
}

module.exports = {
  getProducts
}