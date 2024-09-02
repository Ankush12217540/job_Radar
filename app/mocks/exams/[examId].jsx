"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const ExamDetailPage = ({ params }) => {
  const router = useRouter();
  const { examId } = params;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState("");

  console.log("reached here");

  useEffect(() => {
    if (!examId) return;

    // Fetch questions for the selected exam
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/mock/exam/questions/${examId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setResult("Correct!");
    } else {
      setResult("Wrong!");
    }

    setTimeout(() => {
      setResult("");
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert("Mock Exam completed!");
        router.push("/mocks/exams");
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Exam Questions</h2>
      {questions.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-xl mb-4">
            {questions[currentQuestionIndex].question}
          </p>
          <ul className="space-y-2 mb-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-200 ${
                  selectedAnswer === option ? "bg-gray-300" : "bg-white"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 disabled:bg-gray-300"
          >
            Submit Answer
          </button>
          {result && (
            <p
              className={`mt-4 text-lg font-bold ${
                result === "Correct!" ? "text-green-500" : "text-red-500"
              }`}
            >
              {result}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamDetailPage;
