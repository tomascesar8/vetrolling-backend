const Plan = require('../models/PlanModel');

const getPlanes = async (req, res) => {
  try {
    const planes = await Plan.find()
    res.status(200).json(planes);
  } catch (error) {
    console.log(error)
    res.status(500).json('Error al buscar planes');
  }
}

module.exports = {
  getPlanes
}