import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PIGigP96n9UX7e8wQVmNd8WipwSCI8R6K21mId1GBoCE6D0UZNRPUAYIw0XKcK9Q0MdAnQ02ZEKtZvYauX91glG00cHwlkgqt');

const Cart = ({ children}) => {
    return(
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
};

export default Cart;
