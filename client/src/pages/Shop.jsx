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
      imageUrl: logo, // Use the local logo image
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
      imageUrl: logo, // Use the local logo image
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
      imageUrl: logo, // Use the local logo image
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

  const handleAddToCart = (item) => {
    const imageUrl =
      item.imageUrl ||
      `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`;
    addToCart({ ...item, price: 15, imageUrl });
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
              <SubscriptionCard
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
