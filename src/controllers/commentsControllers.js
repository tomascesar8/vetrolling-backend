const Comment = require('../models/CommentModel');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
    // console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error)
    res.status(500).json('Error al buscar comentarios');
  }
}

module.exports = {
  getComments
}