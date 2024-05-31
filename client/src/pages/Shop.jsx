import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import check from "../assets/check.svg"; // Ensure to import the check icon used in the Homepage

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialView = searchParams.get("view") || "prints";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState(initialView);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const [limit, setLimit] = useState(6);
  const { addToCart } = useCart();

  const subscriptionItems = [
    {
      id: "1",
      title: "1 Month Subscription",
      price: 10,
      perks: [
        "Monthly Art Newsletter",
        "Digital Art Workshop",
        "Exclusive Member Badge",
      ],
    },
    {
      id: "2",
      title: "6 Month Subscription",
      price: 50,
      perks: [
        "Everything in 1 Month Subscription",
        "Access to Premium Galleries",
        "Early Access to New Exhibits",
      ],
    },
    {
      id: "3",
      title: "1 Year Subscription",
      price: 90,
      perks: [
        "Everything in 6 Month Subscription",
        "Unlimited Access to All Galleries",
        "Personalized Art Recommendations",
      ],
    },
  ];

  useEffect(() => {
    if (view === "prints") {
      fetchArtworks();
    }
  }, [view, limit]);

  const fetchArtworks = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?limit=${limit}`
      );
      const data = await response.json();
      const validProducts = data.data.filter(product => product.image_id);
      setProducts(validProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (view === "prints") {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
            searchTerm
          )}&fields=id,title,artist_title,image_id,thumbnail&limit=10`
        );
        const data = await response.json();
        const validProducts = data.data.filter(product => product.image_id);
        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification({
      visible: true,
      message: `${item.title} has been added to cart!`,
    });
    setTimeout(() => setNotification({ visible: false, message: "" }), 3000);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === "prints") {
      fetchArtworks();
    }
  };

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="title-page text-3xl font-bold mb-4 text-center">
        Art Gallery Shop
      </h1>
      <div className="flex justify-center space-x-4 mb-12 mt-12">
        <button
          onClick={() => handleViewChange("prints")}
          className={`mx-2 px-4 py-2 ${
            view === "prints"
              ? "shop-prints-btn text-white"
              : "bg-gray-200 text-gray-800 rounded-full"
          }`}
        >
          Shop Prints
        </button>
        <button
          onClick={() => handleViewChange("subscriptions")}
          className={`mx-2 px-4 py-2 ${
            view === "subscriptions"
              ? "shop-subscription-btn text-white"
              : "bg-gray-200 text-gray-800 rounded-full"
          }`}
        >
          Shop Subscriptions
        </button>
      </div>
      {notification.visible && (
        <div className="popup fixed top-6 left-1/2 transform -translate-x-1/2 text-white p-4 rounded-md shadow-lg transition-all duration-300">
          {notification.message}
        </div>
      )}
      {view === "prints" && (
        <form onSubmit={handleSearch} className="mb-12 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for art prints"
            className="search-bar flex p-2 border border-gray-300 rounded-l-full"
          />
          <button
            type="submit"
            className="save-btn py-2 px-6 text-white rounded-r-full"
          >
            Search
          </button>
        </form>
      )}
      {view === "prints" ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
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
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setLimit((prevLimit) => prevLimit + 6)}
              className="py-2 px-6 text-white rounded-full load-more-btn"
            >
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div id="subscription-block" className="text-center">
          <h2 className="text-3xl font-bold mb-8">
            Become a member to get unlimited access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            {subscriptionItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <h3 className="text-2xl font-semibold mb-4 sub-title">
                  {item.title}
                </h3>
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
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
