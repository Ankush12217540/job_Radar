"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";




const AddQuestion = ({ params }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Array for 4 options
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState(""); // New explanation field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { examId } = params;
  console.log(examId); // Get examId from URL params

  useEffect(() => {
    if (!examId) return; // Wait until examId is available
  }, [examId]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://jobradar-backend-1.onrender.com/api/mock/exam/question",
        {
          examId, // Send examId to associate question with exam
          question,
          options,
          correctAnswer,
          explanation, // Include explanation in the payload
        }
      );

      if (res.data) {
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
        setExplanation(""); // Reset explanation field
      }
    } catch (error) {
      setError("Error adding question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a Question
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="question" className="text-gray-700">
              Question
            </Label>
            <Input
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="options" className="text-gray-700">
              Options
            </Label>
            {options.map((option, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="mb-4">
            <Label htmlFor="correctAnswer" className="text-gray-700">
              Correct Answer
            </Label>
            <Input
              type="text"
              placeholder="Enter Correct Answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="explanation" className="text-gray-700">
              Explanation
            </Label>
            <Input
              type="text"
              placeholder="Enter Explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className={`p-3 mt-4 rounded-md text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
            } hover:bg-blue-700 transition duration-200`}
          >
            {loading ? "Adding Question..." : "Add Question"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
