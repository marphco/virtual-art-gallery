import React from "react";
import check from "../../assets/check.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

// SubscriptionCard component to display a subscription item with an option to add to cart
const SubscriptionCard = ({ item, handleAddToCart }) => (
  <div
    key={item.id}
    className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
    onClick={() => handleAddToCart(item)}
  >
    <h3 className="text-2xl font-semibold mb-4 sub-title">{item.title}</h3>
    <p className="text-lg font-semibold dollar">
      $<span className="price">{item.price}</span>
    </p>
    <ul className="list-disc list-inside mb-4 text-left mt-4">
      {item.perks.map((perk, index) => (
        <li key={index} className="mb-2 flex items-center">
          <img src={check} alt="check" className="h-6 pr-2" />
          {perk}
        </li>
      ))}
    </ul>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart(item);
      }}
      className="py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
    >
      <FontAwesomeIcon
        icon={faCartPlus}
        className="text-white-500 pr-3 cursor-pointer "
      />
      Add to Cart
    </button>
  </div>
);

export default SubscriptionCard;
