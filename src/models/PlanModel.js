const {Schema, model} = require('mongoose');

const PlanSchema = new Schema({
  nombre: String,
  imagen: String,
  precio: String,
  descripción: String,
},{ collection: 'planes' });

module.exports = model('Plan', PlanSchema);