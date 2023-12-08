const AboutUs = require('../models/AboutUsModel');

const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.status(200).json(aboutUs);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json('Internal server error');
  }
}

module.exports = {
  getAboutUs
}