const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
  }
  },{
  timestamps: true,
  }
);

module.exports = model('Admin', AdminSchema);