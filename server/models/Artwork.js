const { Schema, model } = require("mongoose");
const { commentSchema } = require('./Comment');

const artworkSchema = new Schema({
  _id: String,  
  title: {
    type: String,
    required: true,
  },
  artist_titles: String,
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
  comments: [commentSchema],
});

const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;
