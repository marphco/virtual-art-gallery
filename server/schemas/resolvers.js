const { User } = require("../models");
const Order  = require('../models/Order.js');
const Product  = require('../models/Product.js');
const Artwork  = require('../models/Artwork')
require('dotenv').config();
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')('sk_test_51PIGigP96n9UX7e8jhZnh76zfsEYfBJPQJZc3hMwtrMEpuz5W1V2kqsj4MTsj4oj1Tmcq2wp3tmWQ8GUGo1q6Dbr007CcK1wQH')

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
    checkout: async (_, { products }) => {
      const lineItems = [];
  
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
  
        if (product.type === 'artwork') {
  
          const response = await fetch(`https://api.artic.edu/api/v1/artworks/${product.id}?fields=id,title,artist_titles,image_id,thumbnail`);
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
                unit_amount: product.price * 100, 
              },
              quantity: product.quantity,
            });
          } else {
            console.log('Artwork not found for ID:', product.id);
          }
        } else if (product.type === 'subscription') {
          
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Subscription',
                description: 'Unlimited access to the application',
              },
              unit_amount: product.price * 100, 
              recurring: {
                interval: 'month', 
              },
            },
            quantity: 1,
          });
        }
      }

      if (lineItems.length === 0) {
        throw new Error('No valid line items found');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `htpp://localhost:3000/cancel`,
      });

      
      const newOrder = await Order.create({ products });

      return { session: session.id, order: newOrder };
    },
  },
  };

module.exports = resolvers;
