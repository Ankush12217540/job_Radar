"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const CategorySelectionPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch categories from the server (assuming this API is available)
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mock/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    // Redirect to the exams page with the selected category
    router.push(`/mocks?category=${category}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Select a Category</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li
            key={category}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-200"
            onClick={() => handleCategorySelect(category)}
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {category}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelectionPage;
