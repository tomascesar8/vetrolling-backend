const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
  nombre: String,
  imagen: String,
  comentario: String,
});

module.exports = model('Comment', CommentSchema);