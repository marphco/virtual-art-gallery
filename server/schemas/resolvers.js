const { User, Artwork } = require("../models");
const Order = require('../models/Order');
require('dotenv').config();
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')(process.env.VITE_APP_STRIPE_SECRET);

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedArt")
    },
    me: async (parent, args, context) => {
      console.log("Context user in 'me' query:", context.user);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedArt")
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
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        if (err.code === 11000) {
          if (err.keyValue.username) {
            throw new AuthenticationError('Username already exists. Please choose another one.');
          }
          if (err.keyValue.email) {
            throw new AuthenticationError('Email already exists. Please choose another one.');
          }
        }
        throw new AuthenticationError('Something went wrong');
      }
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
        console.error("Error in saveArt resolver:", error);
        throw new Error(error.message);
      }
    },
    updateUsername: async (parent, { newUsername }, context) => {
      // Check if newUsername is provided and not empty
      if (!newUsername || newUsername.trim() === "") {
        throw new AuthenticationError("Username is required.");
      }
    
      if (context.user) {
        const existingUser = await User.findOne({ username: newUsername });
        
        if (existingUser && existingUser._id.toString() !== context.user._id.toString()) {
          throw new AuthenticationError("Username already exists. Please choose another one.");
        }
    
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { username: newUsername },
          { new: true, runValidators: true }
        );
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
