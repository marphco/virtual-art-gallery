import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import './Shop.css'; 

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('prints');
  // const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState({visible: false, message: ''});
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://api.artic.edu/api/v1/artworks?limit=6')
      .then(res => res.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&limit=6`);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification({ visible: true, message: `${product.title} have been added to cart!` });
    setTimeout(() => setNotification({ visibeel:false, message: '' }), 3000);
  };

  // const handleSubscription = (e) => {
  //   e.preventDefault();
  //   setMessage('Thank you for subscribing!');
  //   setEmail('');
  // };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="pt-16">
      <h1>Shop</h1>
      <div className="view-toggle">
        <button onClick={() => handleViewChange('prints')}>Shop Prints</button>
        <button onClick={() => handleViewChange('subscriptions')}>Shop Subscriptions</button>
      </div>
      {notification.visible && (
        <div className="notification">
          {notification.message}
        </div>
      )}
      {view === 'prints' && (
        <>
          <form onSubmit={handleSearch} className="search-form">
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
              <div key={product.id} className="product-card">
                <h2>{product.title}</h2>
                <img src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`} alt={product.title} />
                <p>{product.artist_title}</p>
                <p>${15}</p>
                <button onClick={() => handleAddToCart({ ...product, price: 15 })}>Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
      {view === 'subscriptions' && (
        <div className="subscriptions">
          <h2>Become a member to get unlimited access</h2>
          <div className="products">
            <div className="product-card" onClick={() => handleAddToCart({ title: '1 Month Subscription', price: 10 })}>
              <h3>1 Month</h3>
              <p>$10</p>
            </div>
            <div className="product-card" onClick={() => handleAddToCart({ title: '6 Months Subscription', price: 50 })}>
              <h3>6 Months</h3>
              <p>$50</p>
            </div>
            <div className="product-card" onClick={() => handleAddToCart({ title: '1 Year Subscription', price: 90 })}>
              <h3>1 Year</h3>
              <p>$90</p>
            </div>
          </div>
        </div>
      )}
      <div className="cart">
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
