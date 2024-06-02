import React from "react";
import { useCart } from "../../context/CartContext";

// ProductList component to display a list of products
const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="products">
      {products.slice(0, 5).map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.title}</h2>
          <img
            src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`}
            alt={product.title}
          />
          <p>{product.artist_title}</p>
          <p>${15}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
