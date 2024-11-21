const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for CartItem
const cartItemSchema = new Schema({
  id: { type: String, required: true }, // ID of the cart item
  name: { type: String, required: true }, // Name of the cart item
  price: { type: Number, required: true }, // Price of the cart item
  quantity: { type: Number, required: true }, // Quantity of the cart item
});

// Define the schema for Order
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now, // Default to current date
  },
  products: [cartItemSchema], // Array of CartItem objects
});

// Create the Order model from the schema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model for use in other parts of the application
module.exports = Order;
