import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product, handleAddToCart }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center">
    <h2 className="text-1xl font-semibold mb-4 text-gray-700 text-center">
      {product.title}
    </h2>
    <img
      src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`}
      alt={product.title}
      className="w-48 h-48 object-cover mb-4 rounded-md"
      style={{ width: "200px", height: "200px" }}
    />
    <p className="text-gray-700 mb-2">{product.artist_title}</p>
    <p className="text-lg font-semibold text-600 dollar">
      $<span className="price">{15}</span>
    </p>
    <button
      onClick={() => handleAddToCart({ ...product, price: 15 })}
      className="py-2 mt-4 px-6 text-white rounded-full add-to-cart-btn"
    >
      <FontAwesomeIcon
        icon={faCartPlus}
        className="text-white-500 pr-3 cursor-pointer "
      />
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
