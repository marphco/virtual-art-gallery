const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    artwork: async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_titles,image_id,thumbnail&limit=6"
        );
        const data = await response.json();

        const formattedArt = data.data
          .filter((art) => art.image_id)
          .map((art) => ({
            id: art.id,
            title: art.title,
            image_id: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
            description: art.thumbnail
              ? art.thumbnail.alt_text
              : "No description available",
          }));

        return formattedArt;
      } catch (error) {
        console.error("Error fetching artwork:", error);
        throw new Error("Failed to fetch artwork");
      }
    },

    artworkById: async (parent, { id }) => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_titles,image_id,thumbnail`
        );
        const data = await response.json();

        if (!data.data || !data.data.image_id) {
          throw new Error("Artwork not found or no image available");
        }

        const art = data.data;
        return {
          id: art.id,
          title: art.title,
          image_id: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
          description: art.thumbnail
            ? art.thumbnail.alt_text
            : "No description available",
        };
      } catch (error) {
        console.error("Error fetching artwork by ID:", error);
        throw new Error("Failed to fetch artwork by ID");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteArtwork: async (parent, { id }) => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete artwork");
        }

        return { id };
      } catch (error) {
        console.error("Error deleting artwork:", error);
        throw new Error("Failed to delete artwork");
      }
    },
  },
};

module.exports = resolvers;
