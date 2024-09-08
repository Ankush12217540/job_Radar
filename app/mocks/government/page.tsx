"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Link from "next/link"; // Import Link for navigation

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [categories, setCategories] = useState([]); // To store unique categories
  const [selectedCategory, setSelectedCategory] = useState(""); // To track selected category
  const router = useRouter();

  useEffect(() => {
    // Fetch all exams when the component mounts
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mock/exams"
        );
        const examsData = response.data.exams;

        setExams(examsData);
        setFilteredExams(examsData); // Initialize filteredExams with all exams

        // Extract unique categories from the exams
        const uniqueCategories = [
          ...new Set(examsData.map((exam) => exam.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Function to strip HTML tags and truncate to 75 characters
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.length > 75
      ? textContent.substring(0, 75) + "..."
      : textContent;
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);

    if (selectedCat === "") {
      // If no category is selected, show all exams
      setFilteredExams(exams);
    } else {
      // Filter exams based on selected category
      const filtered = exams.filter((exam) => exam.category === selectedCat);
      setFilteredExams(filtered);
    }
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = exams.filter((exam) =>
      exam.examName.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredExams(filtered);
  };

  const handleAttempt = (examId) => {
    // Navigate to the quiz page for the selected exam
    router.push(`/mock/${examId}/quiz`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Category Filter */}
      <div className="mb-6 flex items-center">
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded-md p-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <SearchBar onSearch={handleSearch} label={"Search for Mock Tests"} />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Mock Tests
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <li
            key={exam._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {exam.examName.trim()}
            </h2>

            {/* Display truncated description */}
            <p className="text-gray-600 mb-4">
              {stripHtml(exam.examDescription)}
            </p>

            <p className="text-sm text-gray-500">
              Date: {new Date(exam.examDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Duration: {exam.examDuration} minutes
            </p>
            <p className="text-sm text-gray-500">
              Questions: {exam.examQuestions.length}
            </p>

            <div className="flex justify-between items-center">
              {/* Attempt button */}
              <button
                onClick={() => handleAttempt(exam._id)}
                className="text-blue-600 hover:underline"
              >
                Attempt
              </button>

              {/* Read More link */}
              <Link
                href={`/mocks/exams/${exam._id}`}
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamPage;
