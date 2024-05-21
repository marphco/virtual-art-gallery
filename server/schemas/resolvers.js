
const { User, Artwork } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET);

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
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedArt: artData } },
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
  //   checkout: async (_, { products }, { headers }) => {
  //     const url = new URL(headers.referer).origin;
    
  //     const newOrder = await Order.create({ products });
    
  //     const productDetails = await Promise.all(products.map(async (productId) => {
  //       const product = await fetchProductById(productId);
  //       return {
  //         name: product.name,
  //         description: product.description,
  //         image: product.image,
  //         price: product.price,
  //         quantity: 1,
  //       };
  //     }));
    
  //     const lineItems = productDetails.map(product => ({
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: product.name,
  //           description: product.description,
  //           images: [`${url}/images/${product.image}`],
  //         },
  //         unit_amount: product.price * 100,
  //       },
  //       quantity: product.quantity,
  //     }));
    
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ['card'],
  //       line_items,
  //       mode: 'payment',
  //       success_url: `${url}/success`,
  //       cancel_url: `${url}/cancel`,
  //     });
    
  //     return { sessionId: session.id };
  //   },
},

}

module.exports = resolvers;