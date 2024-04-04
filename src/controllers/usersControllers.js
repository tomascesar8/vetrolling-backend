const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pet = require('../models/PetModel');
const Turno = require('../models/TurnoModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("pet").populate("turnos");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al buscar usuarios" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("pet")
      .populate({
        path: "turnos",
        populate: { path: "veterinarian" },
        select: "-__v -password",
      });
    if (!user) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, message: "Usuario encontrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener el usuario por ID" });
  }
};

const createUser = async (req, res) => {
  try {
    const userWithSameEmail = await User.findOne({ email: req.body.email.toLowerCase() });
    if (userWithSameEmail) {
      res.status(400).json({ ok: false, message: 'El email ya ha sido registrado' });
      return;
    }
    const newPet = new Pet({
      nombre: req.body.pet.nombre,
      especie: req.body.pet.especie,
      raza: req.body.pet.raza,
    });

    const savedPet = await newPet.save();
    const newUser = new User({
      nombre: req.body.nombre,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      role: req.body.role,
      turnos: req.body.turnos,
      pet: savedPet._id,
    });

    if (newUser.password.length < 6 || newUser.password.length > 30) {
      res.status(400).json({ ok: false, message: 'La contraseña debe tener entre 6 y 30 caracteres' });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    res.status(201).json({ ok: true, message: 'Usuario creado exitosamente'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error al guardar el usuario' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nombre, email, role, pet } = req.body;
    const updatedFields = { nombre, email, role };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (pet && pet.nombre) {
      await Pet.findByIdAndUpdate(updatedUser.pet, { nombre: pet.nombre });
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR AL ACTUALIZAR USUARIO" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userTurnos = await Turno.find({ user: userId }); // Buscar y eliminar turnos relacionados con el usuario
    for (const turno of userTurnos) {
      await Turno.findByIdAndDelete(turno._id);
    }
    const userDelete = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Usuario y turnos asociados eliminados exitosamente', userDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al eliminar el usuario y sus turnos asociados');
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
      return;
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
    res.status(200).json({ ok: true, message: 'Usuario autenticado exitosamente', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error al autenticar el usuario' });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, message: "Usuario encontrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener el usuario autenticado" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAuthUser,
};