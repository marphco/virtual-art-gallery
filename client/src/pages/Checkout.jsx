import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries.js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PIGigP96n9UX7e8wQVmNd8WipwSCI8R6K21mId1GBoCE6D0UZNRPUAYIw0XKcK9Q0MdAnQ02ZEKtZvYauX91glG00cHwlkgqt");

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const [getCheckout, { data, loading, error }] = useLazyQuery(QUERY_CHECKOUT);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (data) {
      console.log("Checkout session data received:", data);
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({ sessionId: data.checkout.session }).then(result => {
          if (result.error) {
            console.error('Stripe redirect error:', result.error.message);
          }
        });
      });
    }
  }, [data]);

  const handlePlaceOrder = () => {
    console.log('Placing order with products:', cart);
    const products = cart.map(item => ({
      id: item.id,
      name: item.title,
      price: item.price,
      quantity: item.quantity, // Fix missing comma here
    }));
    console.log("Placing order with products:", products);
    getCheckout({ variables: { products } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Checkout
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Shopping Cart
          </h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-4">
                <div className="flex-1 flex items-center space-x-4">
                  <span className="text-m justify-start flex-1 text-gray-800">
                    {item.title}
                  </span>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-20 text-center border rounded-lg py-1 px-2"
                  />
                </div>
                <div className="flex-1 flex justify-between items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-800">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total</h2>
          <p className="text-lg font-semibold text-gray-800">
            ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <button onClick={handlePlaceOrder} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full">
            Place Order
          </button>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700 underline block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
