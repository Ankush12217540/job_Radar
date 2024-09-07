"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Link from "next/link"; // Import Link for navigation

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all exams when the component mounts
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "https://jobradar-backend-1.onrender.com/api/mock/exams"
        );
        setExams(response.data.exams);
        setFilteredExams(response.data.exams); // Initialize filteredExams with all exams
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Function to strip HTML tags and truncate to 400 characters
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.length > 75
      ? textContent.substring(0, 75) + "..."
      : textContent;
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
      <SearchBar onSearch={handleSearch} label={"Search for Mock Tests"} />
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
