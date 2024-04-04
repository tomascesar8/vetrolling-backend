const Comment = require('../models/CommentModel');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
    res.status(200).json(comments);
  } catch (error) {
    console.error(error)
    res.status(500).json('Error al buscar comentarios');
  }
}

module.exports = {
  getComments
}