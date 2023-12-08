const {Schema, model} = require('mongoose');

const AboutUsSchema = new Schema({
  nombre: String,
  imagen: String,
  descripcionProyecto: String,
  sobreMi: String,
});

module.exports = model('AboutUs', AboutUsSchema);