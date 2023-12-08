const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
  nombre: String,
  imagen: String,
  precio: String,
  descripción: String,
});

module.exports = model('Product', ProductSchema);