const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const artworkSchema = new Schema({
    // No need to explicitly define _id, Mongoose will do it automatically
    title: {
        type: String,
        required: true
    },
    artist_titles: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;