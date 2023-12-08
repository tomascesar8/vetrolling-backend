const {Schema, model} = require('mongoose');

const ServiceSchema = new Schema({
  nombre: String,
  imagen: String,
  descripción: String,
});

module.exports = model('Service', ServiceSchema);