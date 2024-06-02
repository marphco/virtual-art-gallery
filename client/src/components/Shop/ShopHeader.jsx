import React from "react";

const ShopHeader = ({ view, handleViewChange }) => (
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
);

export default ShopHeader;
