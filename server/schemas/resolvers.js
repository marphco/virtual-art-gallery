const { User, Order } = require("../models");
require('dotenv').config();
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET);

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
    checkout: async (_, { products }, { headers }) => {
      const url = new URL(headers.referer).origin;
    
      const newOrder = await Order.create({ products });
    
      const productDetails = await Promise.all(products.map(async (productId) => {
        const product = await fetchProductById(productId);
        return {
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          quantity: 1,
        };
      }));
    
      const lineItems = productDetails.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [`${url}/images/${product.image}`],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success`,
        cancel_url: `${url}/cancel`,
      });
    
      return { sessionId: session.id };
    },
  },
};

module.exports = resolvers;
