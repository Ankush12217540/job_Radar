"use client";
import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    remote: false,
    onsite: false,
    "full-time": false,
    "part-time": false,
    contract: false,
    internship: false,
    minSalary: 0,
    maxSalary: 100000,
  });

  const [isExpanded, setIsExpanded] = useState(false); // State to handle dropdown

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleSalaryChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: Number(value),
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg shadow-lg bg-white mx-4 my-4">
      {/* Toggle Button */}
      <div
        className="p-2 border-b border-gray-200 cursor-pointer flex justify-between items-center"
        onClick={toggleExpand}
      >
        <h2 className=" font-bold text-gray-800">Filters</h2>
        <button className="text-blue-600 hover:text-blue-700 focus:outline-none">
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>

      {/* Dropdown content */}
      {isExpanded && (
        <div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Location
            </h3>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="remote"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="remote" className="text-gray-600">
                Remote
              </label>
            </div>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="onsite"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="onsite" className="text-gray-600">
                Onsite
              </label>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Job Type
            </h3>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="full-time"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="full-time" className="text-gray-600">
                Full-time
              </label>
            </div>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="part-time"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="part-time" className="text-gray-600">
                Part-time
              </label>
            </div>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="contract"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="contract" className="text-gray-600">
                Contract
              </label>
            </div>
            <div className="flex items-center gap-x-4 mb-3">
              <input
                type="checkbox"
                id="internship"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="internship" className="text-gray-600">
                Internship
              </label>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Salary Range
            </h3>
            <div className="flex items-center gap-x-4 mb-3">
              <label htmlFor="minSalary" className="text-gray-600">
                Min:
              </label>
              <input
                type="number"
                id="minSalary"
                className="w-24 p-2 border border-gray-300 rounded-md"
                placeholder="0"
                value={filters.minSalary}
                onChange={handleSalaryChange}
              />
            </div>
            <div className="flex items-center gap-x-4 mb-3">
              <label htmlFor="maxSalary" className="text-gray-600">
                Max:
              </label>
              <input
                type="number"
                id="maxSalary"
                className="w-24 p-2 border border-gray-300 rounded-md"
                placeholder="100000"
                value={filters.maxSalary}
                onChange={handleSalaryChange}
              />
            </div>
          </div>

          <div className="p-6">
            <button
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
