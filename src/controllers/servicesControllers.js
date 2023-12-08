const Service = require('../models/ServiceModel');

const getServices = async (req, res) => {
  try {
    const services = await Service.find()
    console.log(services);
    res.status(200).json(services);
  } catch (error) {
    console.log(error)
    res.status(500).json('Error al buscar servicios');
  }
}

module.exports = {
  getServices
}