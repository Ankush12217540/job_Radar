"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // ReactQuill styles

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddExam = () => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [examList, setExamList] = useState([]);
  const [fetchingExams, setFetchingExams] = useState(true); // New loading state for fetching exams
  const [error, setError] = useState(""); // Error state
  const [deletingExamId, setDeletingExamId] = useState(null); // Track the exam being deleted

  const router = useRouter();

  // Fetch existing exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mock/exams"
        );
        setExamList(response.data.exams);
      } catch (error) {
        setError("Error fetching exams.");
      } finally {
        setFetchingExams(false); // Stop loading state
      }
    };

    fetchExams();
  }, []);

  const handleInputChange = () => {
    setIsDisabled(!examName || !examDescription || !examDate || !examDuration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/mock/exam", {
        examName,
        examDescription,
        examDate,
        examDuration,
      });

      if (res.data) {
        // Clear form after successful submission
        setExamName("");
        setExamDescription("");
        setExamDate("");
        setExamDuration("");
        setIsDisabled(true);

        // Refresh exam list
        setExamList((prevExams) => [...prevExams, res.data.exam]);
      }
    } catch (error) {
      setError("Error creating exam.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting an exam
  const handleDeleteExam = async (examId) => {
    const confirmation = confirm("Are you sure you want to delete this exam?");
    if (!confirmation) return;

    setDeletingExamId(examId);
    try {
      await axios.delete(`http://localhost:8000/api/mock/exam/${examId}`);
      setExamList((prevExams) =>
        prevExams.filter((exam) => exam._id !== examId)
      ); // Remove the deleted exam from the state
    } catch (error) {
      setError("Error deleting exam.");
    } finally {
      setDeletingExamId(null); // Reset the deleting state
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Add Exam Form */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add a New Exam
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="examName" className="text-gray-700">
                Exam Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Exam Name"
                value={examName}
                onChange={(e) => {
                  setExamName(e.target.value);
                  handleInputChange();
                }}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="examDescription" className="text-gray-700">
                Exam Description
              </Label>
              <ReactQuill
                value={examDescription}
                onChange={(value) => {
                  setExamDescription(value);
                  handleInputChange();
                }}
                className="rounded-md"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="examDate" className="text-gray-700">
                Exam Date
              </Label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => {
                  setExamDate(e.target.value);
                  handleInputChange();
                }}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="examDuration" className="text-gray-700">
                Exam Duration (minutes)
              </Label>
              <Input
                type="number"
                placeholder="120"
                value={examDuration}
                onChange={(e) => {
                  setExamDuration(e.target.value);
                  handleInputChange();
                }}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={isDisabled || loading}
              className={`p-3 mt-4 rounded-md text-white ${
                isDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
              } hover:bg-blue-700 transition duration-200`}
            >
              {loading ? "Creating Exam..." : "Create Exam"}
            </Button>
          </form>
        </div>
        {/* Right Column: List of Exams */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">All Exams</h2>
          {fetchingExams ? (
            <p>Loading exams...</p>
          ) : examList.length > 0 ? (
            <ul className="space-y-4">
              {examList.map((exam) => (
                <li
                  key={exam._id}
                  className="p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <h3 className="text-xl font-semibold">{exam.examName}</h3>
                  <p className="text-gray-600">
                    {new Date(exam.examDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Duration: {exam.examDuration} minutes
                  </p>
                  <p className="mt-2 text-blue-600 hover:underline">
                    <a
                      href={`add-exams/${exam._id}`} // Redirect to add questions page with the examId
                    >
                      Add Questions
                    </a>
                  </p>
                  <Button
                    onClick={() => handleDeleteExam(exam._id)}
                    disabled={deletingExamId === exam._id}
                    className={`mt-2 rounded-md text-white ${
                      deletingExamId === exam._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600"
                    } hover:bg-red-700 transition duration-200`}
                  >
                    {deletingExamId === exam._id
                      ? "Deleting..."
                      : "Delete Exam"}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No exams available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExam;
