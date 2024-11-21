const { Schema, model } = require("mongoose");

// Define the schema for Artwork
const artworkSchema = new Schema({
  _id: String, // ID of the artwork
  title: {
    type: String,
    required: true, // Title is required
  },
  artist_titles: String, // Names of the artists
  description: {
    type: String,
    required: true, // Description is required
  },
  imageUrl: String, // URL of the artwork image
});

// Create the Artwork model from the schema
const Artwork = model("Artwork", artworkSchema);

// Export the model for use in other parts of the application
module.exports = Artwork;
