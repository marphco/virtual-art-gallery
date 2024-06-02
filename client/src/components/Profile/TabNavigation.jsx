import React from "react";

// TabNavigation component allows switching between 'favorites' and 'order-history' tabs
const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="mb-8 flex flex-wrap justify-center">
    <button
      onClick={() => setActiveTab("favorites")}
      className={`mx-2 px-4 py-2 ${
        activeTab === "favorites"
          ? "fav-btn text-white"
          : "bg-gray-200 text-gray-800 rounded-full"
      } mb-2`}
    >
      Favorites
    </button>
    <button
      onClick={() => setActiveTab("order-history")}
      className={`mx-2 px-4 py-2 ${
        activeTab === "order-history"
          ? "order-history-btn text-white"
          : "bg-gray-200 text-gray-800 rounded-full"
      } mb-2`}
    >
      Order History
    </button>
  </div>
);

export default TabNavigation;
