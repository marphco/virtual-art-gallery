import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useMutation } from "@apollo/client";
import { CHECKOUT_MUTATION } from "../../src/utils/mutations";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const stripePromise = loadStripe(
    "pk_test_51PIGigP96n9UX7e8wQVmNd8WipwSCI8R6K21mId1GBoCE6D0UZNRPUAYIw0XKcK9Q0MdAnQ02ZEKtZvYauX91glG00cHwlkgqt"
  );
  const [checkout] = useMutation(CHECKOUT_MUTATION);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const { data } = await checkout({ variables: { products: cart } });
      const { session } = data.checkout;

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
              <li
                key={index}
                className="flex justify-between items-center py-4"
              >
                <div className="flex-1 flex items-center space-x-4">
                  <span className="text-m justify-start flex-1 text-gray-800">
                    {item.title}
                  </span>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-20 text-center border rounded-lg py-1 px-2"
                  />
                </div>
                <div className="flex-1 flex justify-between items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-800">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
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
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full"
          >
            Place Order
          </button>
          <Link
            to="/shop"
            className="text-blue-600 hover:text-blue-700 underline block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
