
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('prints');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks')
      .then(res => res.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, price: 15 }]);
  };

  const handleSubscription = (e) => {
    e.preventDefault();
    setMessage('Thank you for subscribing!');
    setEmail('');
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <h1>Shop</h1>
      <div className="view-toggle">
        <button onClick={() => handleViewChange('prints')}>Shop Prints</button>
        <button onClick={() => handleViewChange('subscriptions')}>Shop Subscriptions</button>
      </div>
      {view === 'prints' && (
        <>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for art prints"
            />
            <button type="submit">Search</button>
          </form>
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product">
                <h2>{product.title}</h2>
                <img src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`} alt={product.title} />
                <p>{product.artist_title}</p>
                <p>${15}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
      {view === 'subscriptions' && (
        <div className="subscriptions">
          <h2>Subscribe to our newsletter</h2>
          <form onSubmit={handleSubscription}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p>{message}</p>}
          <div className="subscription-options">
            <div className="subscription-option" onClick={() => handleAddToCart({ title: '1 Month Subscription', price: 10 })}>
              <h3>1 Month</h3>
              <p>$10</p>
            </div>
            <div className="subscription-option" onClick={() => handleAddToCart({ title: '6 Months Subscription', price: 50 })}>
              <h3>6 Months</h3>
              <p>$50</p>
            </div>
            <div className="subscription-option" onClick={() => handleAddToCart({ title: '1 Year Subscription', price: 90 })}>
              <h3>1 Year</h3>
              <p>$90</p>
            </div>
          </div>
        </div>
      )}
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
        <Link to="/checkout">
          <button>
            <FaShoppingCart /> Go to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shop;
