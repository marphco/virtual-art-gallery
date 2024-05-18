const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        artwork: async () => {
            try {
                const response = await fetch(
                    "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_titles,image_id,thumbnail&limit=6"
                );
                const data = await response.json();
                console.log(data)

                // Filter out artworks without images and format the data
                const formattedArt = data.data
                    .filter((art) => art.image_id) // Only include artworks with an image_id
                    .map((art) => ({
                        id: art.id,
                        title: art.title,
                        // artist_titles:  art.artist_titles,
                        image_id: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
                        description: art.thumbnail
                            ? art.thumbnail.alt_text
                            : "No description available",
                    }));

                return formattedArt;
            } catch (error) {
                console.error("Error fetching favorite art:", error);
                throw new Error("Failed to fetch favorite art");
            }
        }
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
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
    }
}


module.exports = resolvers;