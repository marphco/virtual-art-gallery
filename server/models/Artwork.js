const { Schema, model } = require('mongoose');

const artworkSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
});

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;