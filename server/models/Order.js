const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  id: { type: String, required: true },
  name: {type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [cartItemSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
