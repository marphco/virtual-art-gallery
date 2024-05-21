
const { User } = require("../models");
const { Artwork } = require("../models")
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Added 'users' and 'user' queries to match schema
    users: async () => {
      return User.find().populate("savedArt");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedArt");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedArt");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: { // Moved Mutation object inside the resolvers object
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
    saveArt: async (parent, { artData }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedArt: artData } }, // Make sure the savedArt field is updated correctly
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeArt: async (parent, { artId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedArt: { artId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

}

module.exports = resolvers;