const { Schema, model } = require('mongoose');

const artworkSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // artist_titles: {
    //     type: String,
    //     required: true
    // },
    description: {
      type: String,
      required: true
  },
    imageUrl: {
        type: String,
        required: true
    },
    description: String
});

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;