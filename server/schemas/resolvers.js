
const { User, Artwork , Comment } = require("../models");
const Order = require('../models/Order');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')("sk_test_51PIGigP96n9UX7e8jhZnh76zfsEYfBJPQJZc3hMwtrMEpuz5W1V2kqsj4MTsj4oj1Tmcq2wp3tmWQ8GUGo1q6Dbr007CcK1wQH")


const resolvers = {
  Query: {

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedArt");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedArt");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkout: async (_, { products }, context) => {
      try {
        console.log('Received products:', products);

        const url = new URL(context.headers.referer).origin;
        const lineItems = products.map(product => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        }));

        if (lineItems.length === 0) {
          throw new Error('No valid line items found');
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        console.log('Stripe session created:', session);

        // Create a new order
        const newOrder = await Order.create({ products });

        // Associate the order with the user (assuming user is authenticated)
        if (context.user) {
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: newOrder } });
        } else {
          throw new Error("You need to be logged in!");
        }

        return { session: session.id, order: newOrder };
      } catch (error) {
        console.error('Error in checkout resolver:', error);
        throw new Error('Checkout process failed');
      }
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
    addComment: async (_, { artId, text }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw new Error("User not found");
          }
    
          // Find the artwork by its _id
          const savedArtwork = user.savedArt.find(art => art.id.toString() === artId);
          if (!savedArtwork) {
            throw new Error("Artwork not found in saved art");
          }
    
          // Create a new comment
          const newComment = await Comment.create({
            text: text,
            user: context.user._id
          });
    
          // Push the new comment into the comments array of the artwork
          savedArtwork.comments.push(newComment);
          
          // Save the user document to update the comments array
          await user.save();
    
          return newComment;
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
      } catch (error) {
        console.error("Error in addCommentToSavedArt resolver:", error);
        throw new Error(error.message);
      }
    },
    saveArt: async (parent, { artData }, context) => {
      try {
        if (context.user) {
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedArt: artData } },
            { new: true, runValidators: true }
          );
        } else {
          throw new Error("You need to be logged in!");
        }
      } catch (error) {
        // Handle the error here
        console.error("Error in saveArt resolver:", error);
        throw new Error(error.message); // Rethrow the error for Apollo Server to handle
      }

    },



    removeArt: async (parent, { artId }, context) => {
      try {
        if (context.user) {
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedArt: { id: artId } } },
            { new: true }
          ).populate("savedArt");
        } else {
          throw new Error("You need to be logged in!");
        }
      } catch (error) {
        console.error("Error in removeArt resolver:", error);
        throw new Error(error.message);
      }
    },

  },

};

module.exports = resolvers;