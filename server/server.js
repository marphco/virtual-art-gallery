const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET)
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(cors());

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(bodyParser.json()); // Middleware to parse JSON bodies

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    // Define the /save-cache endpoint
    app.post('/save-cache', (req, res) => {
        const cacheData = req.body;
        // Save the cache data to your database or handle it as needed
        console.log('Received cache data:', cacheData);

        // Respond to the client
        res.status(200).send('Cache data received');
    });

    app.post('/create-checkout-session', async (req, res) => {
        const { cartItems } = req.body;

        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            });

            res.json({ id: session.id });
        } catch (error) {
            console.error('Error creating Stripe checkout session:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

// Call the async function to start the server
startApolloServer();
