import React from "react";

// LoadMoreButton component to load more items
const LoadMoreButton = ({ setLimit }) => (
  <div className="flex justify-center mt-12">
    <button
      onClick={() => setLimit((prevLimit) => prevLimit + 6)}
      className="py-2 px-6 text-white rounded-full load-more-btn"
    >
      Load More
    </button>
  </div>
);

export default LoadMoreButton;
