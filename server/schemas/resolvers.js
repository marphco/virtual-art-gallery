const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        
        getArt: async () => {
          try {
            
            const response = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?q=song%20xu&skip=2&limit=1&indent=1');
            console.log(response)
            const data = await response.json();
            
            
            const arts = data.arts;
            
            return arts;
          } catch (error) {
            console.error('Error fetching arts from external API:', error);
            throw new Error('Failed to fetch arts from external API');
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
        },}}
  

module.exports = resolvers;