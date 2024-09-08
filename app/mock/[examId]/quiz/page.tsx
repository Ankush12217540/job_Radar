"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const MockTest = ({ params }) => {
  const { examId } = params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

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

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
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
        <h1 className="text-4xl font-bold mb-6">Mock Test Finished</h1>
        <p className="text-gray-700 text-lg">
          Your score is: <span className="font-semibold">{score}</span> /{" "}
          {questions.length}
        </p>

        {/* Display summary of correct and incorrect answers */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Review your answers:</h2>
          <ul className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect =
                selectedOptions[index] === question.correctAnswer;
              return (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow-md ${
                    isCorrect
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                  }`}
                >
                  <p className="font-semibold text-lg">
                    Q{index + 1}: {question.question}
                  </p>
                  <p>
                    Your answer:{" "}
                    <span
                      className={isCorrect ? "text-green-700" : "text-red-700"}
                    >
                      {selectedOptions[index]}
                    </span>
                  </p>
                  {!isCorrect && (
                    <div className="mt-2">
                      <p className="text-red-700">
                        Correct answer: {question.correctAnswer}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

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
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  selectedOptions[currentQuestionIndex] === option
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOptions[currentQuestionIndex]}
          className={`px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all ${
            !selectedOptions[currentQuestionIndex]
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
