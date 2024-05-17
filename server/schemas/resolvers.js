const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios')

const resolvers = {
    Query: {
        artwork: async (_, { id }) => {
            try {
                const response = await axios.get(`https://api.artic.edu/api/v1/artworks?ids=${id}`);
                const artworks = response.data.data;
                const artwork = artworks.find(artwork => artwork.id === parseInt(id));

                if (!artwork) {
                    throw new Error(`Artwork not found`);
                }

                return {
                    id: artwork.id.toString(),
                    title: artwork.title,
                    imageUrl: artwork.image.url,
                    description: artwork.thumbnail,
                };
            } catch (error) {
                console.error('Error fetching artwork:', error);
                throw new Error('Failed to fetch artwork');
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