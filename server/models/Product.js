const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    default: 0,
  }
});

const Product = model('Product', productSchema);
module.exports = Product;
