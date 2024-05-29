import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

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
      setProducts(data.data);
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
        console.log("Search results:", data);
        setProducts(data.data);
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

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/200";
  };

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl mt-10 font-bold text-center mb-12 text-gray-900">
        Art Gallery Shop
      </h1>
      <div className="flex justify-center space-x-4 mb-12">
        <button
          onClick={() => handleViewChange("prints")}
          className={`py-2 px-6 font-semibold rounded-full shadow-lg transition-all duration-300 ${
            view === "prints"
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-indigo-600 hover:text-white"
          }`}
        >
          Shop Prints
        </button>
        <button
          onClick={() => handleViewChange("subscriptions")}
          className={`py-2 px-6 font-semibold rounded-full shadow-lg transition-all duration-300 ${
            view === "subscriptions"
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-indigo-600 hover:text-white"
          }`}
        >
          Shop Subscriptions
        </button>
      </div>
      {notification.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white p-4 rounded-md shadow-lg transition-all duration-300">
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
            className="p-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="submit"
            className="py-2 px-6 bg-indigo-600 text-white rounded-r-full hover:bg-indigo-700"
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
                <h2 className="text-1xl font-semibold mb-4 text-gray-900">
                  {product.title}
                </h2>
                <img
                  src={`https://www.artic.edu/iiif/2/${product.image_id}/full/843,/0/default.jpg`}
                  alt={product.title}
                  className="w-48 h-48 object-cover mb-4 rounded-md"
                  style={{ width: "200px", height: "200px" }}
                  onError={handleImageError}
                />
                <p className="text-gray-700 mb-2">{product.artist_title}</p>
                <p className="text-lg font-semibold mb-4 text-indigo-600">
                  ${15}
                </p>
                <button
                  onClick={() => handleAddToCart({ ...product, price: 15 })}
                  className="py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setLimit((prevLimit) => prevLimit + 6)}
              className="py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Become a member to get unlimited access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {subscriptionItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-lg font-semibold text-indigo-600">
                  ${item.price}
                </p>
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
