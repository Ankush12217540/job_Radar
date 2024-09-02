"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch, label }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="w-4/5 mx-auto my-4 flex items-center">
      <input
        placeholder={label ? label : "Find your dream job here"}
        className="w-full p-4 bg-slate-100 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearchClick}
        className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
