
const { User, Artwork } = require("../models");
const Order = require('../models/Order');
const Product = require('../models/Product');
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET)

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
            { $pull: { savedArt: { artId } } },
            { new: true }
          );
        } else {
          throw new Error("You need to be logged in!");
        }
      } catch (error) {
        // Handle the error here
        console.error("Error in removeArt resolver:", error);
        throw new Error(error.message); // Rethrow the error for Apollo Server to handle
      }
    
    },
    
    checkout: async (_, { products }) => {
      const lineItems = [];

      for (let i = 0; i < products.length; i++) {
        
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${products[i]}?fields=id,title,artist_titles,image_id,thumbnail`);
        const art = await response.json();

        if (art && art.data && art.data.image_id) {
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: art.data.title,
                images: [`https://www.artic.edu/iiif/2/${art.data.image_id}/full/843,/0/default.jpg`],
                description: art.data.thumbnail ? art.data.thumbnail.alt_text : "No description available",
              },
              unit_amount: 1000, 
            },
            quantity: 1,
          });
        } else {
          console.log('Artwork not found for ID:', products[i]); 
          
        }
      }

      if (lineItems.length === 0) {
        throw new Error('No valid line items found');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      
      const newOrder = await Order.create({ products });

      return { session: session.id, order: newOrder };
    },
  },
};

module.exports = resolvers;