const { Schema, model } = require("mongoose");

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

    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' }]
});

const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;
