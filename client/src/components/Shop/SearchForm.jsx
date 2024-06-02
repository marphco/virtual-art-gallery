import React from "react";

// SearchForm component for searching art prints
const SearchForm = ({ searchTerm, setSearchTerm, handleSearch }) => (
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
);

export default SearchForm;
