const Admin = require('../models/AdminModel');

const getAdmins = async (req, res) => {
  try{
    const admins = await Admin.find();
    console.log(admins);
    res.status(200).json(admins);
  } catch(error){
    console.log(error)
    res.status(500).json('Error al buscar administradores');
  }
}; 

module.exports = {
  getAdmins
}