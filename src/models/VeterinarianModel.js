const { Schema, model } = require('mongoose');

const VeterinarianSchema = new Schema({
  nombre: String,
  especialidad: String,
  horario: String,
  imagen: String
});

module.exports = model('Veterinarian', VeterinarianSchema);
