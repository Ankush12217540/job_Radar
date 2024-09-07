"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ExamDetailPage = ({ params }) => {
  const { examId } = params;
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/mock/exams/${examId}`
        );
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (loading) {
    return <p>Loading exam details...</p>;
  }

  if (!exam) {
    return <p>Exam not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{exam.examName}</h1>
      <div
        className="text-gray-600 mb-6"
        dangerouslySetInnerHTML={{ __html: exam.examDescription }}
      />
      <p className="text-gray-500">
        Date: {new Date(exam.examDate).toLocaleDateString()}
      </p>
      <p className="text-gray-500">Duration: {exam.examDuration} minutes</p>
      <p className="text-gray-500">Questions: {exam.examQuestions.length}</p>

      <button
        onClick={() => router.push(`/mock/${examId}/quiz`)}
        className="text-blue-600 mt-4"
      >
        Attempt Mock Test
      </button>
    </div>
  );
};

export default ExamDetailPage;
