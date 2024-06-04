import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ShopHeader from "../components/Shop/ShopHeader.jsx";
import SearchForm from "../components/Shop/SearchForm";
import Notification from "../components/Shop/Notification";
import ProductCard from "../components/Shop/ProductCard";
import SubscriptionCard from "../components/Shop/SubscriptionCard";
import LoadMoreButton from "../components/Shop/LoadMoreButton";
import logo from "../assets/logo.svg";
import check from "../assets/check.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

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
    imageUrl: "",
  });
  const [limit, setLimit] = useState(6);
  const { addToCart } = useCart();

  const subscriptionItems = [
    {
      id: "1",
      title: "1 Month Subscription",
      price: 10,
      imageUrl: logo,
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
      imageUrl: logo,
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
      imageUrl: logo,
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
      const validProducts = data.data.filter((product) => product.image_id);
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
        const validProducts = data.data.filter((product) => product.image_id);
        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    }
  };

  const handleAddToCart = (item, price = 15) => {
    const imageUrl = item.perks ? logo : `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`;
    addToCart({ ...item, price, imageUrl });
    setNotification({
      visible: true,
      message: `${item.title} has been added to cart!`,
      imageUrl,
    });
    setTimeout(
      () => setNotification({ visible: false, message: "", imageUrl: "" }),
      3000
    );
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
      <ShopHeader view={view} handleViewChange={handleViewChange} />
      <Notification notification={notification} />
      {view === "prints" && (
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      )}
      {view === "prints" ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <LoadMoreButton setLimit={setLimit} />
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
                onClick={() => handleAddToCart(item, item.price)}
              >
                <img src={logo} alt="subscription" className="hidden" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-lg font-semibold text-600 dollar">
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
                    handleAddToCart(item, item.price);
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
