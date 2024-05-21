import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PIGigP96n9UX7e8wQVmNd8WipwSCI8R6K21mId1GBoCE6D0UZNRPUAYIw0XKcK9Q0MdAnQ02ZEKtZvYauX91glG00cHwlkgqt');

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
  //   const stripe = await stripePromise;

  //   const response = await fetch('/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ cartItems: cart })
  //   });

  //   const session = await response.json();

  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     console.error(result.error.message);
  //   }
  // };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)} x {item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="ml-2 border rounded"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Total</h2>
        <p>${calculateTotal().toFixed(2)}</p>
      </div>
      <button onClick={handlePlaceOrder} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Place Order
      </button>
      <Link to="/shop" className="text-blue-500 hover:underline mt-4 block">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Checkout;