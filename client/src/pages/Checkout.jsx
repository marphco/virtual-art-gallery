import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries.js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUB);

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
        stripe
          .redirectToCheckout({ sessionId: data.checkout.session })
          .then((result) => {
            if (result.error) {
              console.error("Stripe redirect error:", result.error.message);
            }
          });
      });
    }
  }, [data]);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      return;
    }

    console.log("Placing order with products:", cart);
    const products = cart.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      name: item.title,
      price: item.price,
      quantity: item.quantity,
    }));
    console.log("Placing order with products:", products);
    getCheckout({ variables: { products } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="checkout-page min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="title-page text-3xl font-bold mb-4 text-center">
          Checkout
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row justify-between items-center py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500">{item.artist}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full md:w-auto mt-4 md:mt-0 space-x-4">
                  <div className="flex justify-start items-center space-x-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-20 text-center border rounded-full py-1 px-2"
                    />
                    <span className="text-lg font-semibold text-gray-800">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Total</h2>
          <p className="text-lg font-semibold text-gray-800">
            ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handlePlaceOrder}
            className="place-order-btn text-white font-semibold py-2 px-4 rounded-full mb-4 w-full"
          >
            Place Order
          </button>
          <Link to="/shop" className="underline block hover:text-green-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
