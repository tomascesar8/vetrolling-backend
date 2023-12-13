const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try{
    const users = await User.find().populate('pets');
    res.status(200).json(users);
  } catch(error){
    console.log(error)
    res.status(500).json('Error al buscar usuarios');
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    if (newUser.password.length < 6 || newUser.password.length > 30) {
      res.status(400).json({message: 'La contraseña debe tener entre 6 y 30 caracteres'});
      return;
    }
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt); 
    console.log(newUser);
    await newUser.save();
    res.status(201).json({message: 'Usuario creado exitosamente', newUser});
  }catch (error) {
    console.error(error);
    res.status(500).json('Error al guardar el usuario');
  }
}

const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndUpdate(_id, req.body, {new: true},{runValidators: true});
    console.log(user);
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al actualizar el usuario');
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body._id);
    console.log(user);
    res.status(200).json({message: 'Usuario eliminado exitosamente', user});
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al eliminar el usuario');
  }
}

const loginUser = async (req, res) => {
  try {
    console.log(req.headers);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: 'Usuario no encontrado' });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Contraseña incorrecta' });
      return;
    }
    
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY);
    console.log(token);
    // const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    console.log(user);
    res.status(200).json({ message: 'Usuario autenticado exitosamente', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al autenticar el usuario');
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser
}
