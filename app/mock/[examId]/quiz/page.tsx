"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const MockTest = ({ params }) => {
  const { examId } = params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://jobradar-backend-1.onrender.com/api/mock/exam/questions/${examId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === questions[currentQuestionIndex].correctAnswer);
    setShowExplanation(true); // Always show the explanation after selecting an option
  };

  if (!questions.length) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">Loading questions...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Quiz Finished</h1>
        <p className="text-gray-700 text-lg">
          Your score is: <span className="font-semibold">{score}</span> /{" "}
          {questions.length}
        </p>
        <button
          onClick={() => router.push("/mocks")}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-xl font-medium text-gray-800 mb-4">
          {questions[currentQuestionIndex].question}
        </p>
        <ul className="space-y-4">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index} className="w-full">
              <button
                onClick={() => handleOptionSelect(option)}
                disabled={showExplanation} // Disable option selection after answer is shown
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  selectedOption === option
                    ? isCorrect
                      ? "border-green-500 bg-green-100 text-green-700"
                      : "border-red-500 bg-red-100 text-red-700"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        {showExplanation && (
          <div className="mt-4 p-4 rounded-lg bg-gray-100">
            <p className="font-bold">
              {isCorrect ? "Correct!" : "Incorrect!"}{" "}
              {isCorrect
                ? "You chose the correct answer."
                : `The correct answer was: ${questions[currentQuestionIndex].correctAnswer}`}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Explanation:</strong>{" "}
              {questions[currentQuestionIndex].explanation}
            </p>
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className={`px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all ${
            !selectedOption
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default MockTest;
