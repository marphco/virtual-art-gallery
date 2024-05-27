const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    artId: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = { Comment, commentSchema };
