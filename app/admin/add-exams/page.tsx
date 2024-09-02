"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toast as toast } from "@/components/ui/toast";

const AddExam = () => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      console.log(res.data);

      if (res.data) {
        router.replace("/mocks");
      } // Redirect to home or another page after successful creation
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-4">
      <form
        className="flex flex-col justify-center gap-5 w-full md:w-1/3 bg-white p-8 rounded-lg shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Exam
        </h1>
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
        <Label htmlFor="examDescription" className="text-gray-700">
          Exam Description
        </Label>
        <textarea
          placeholder="Enter Exam Description"
          value={examDescription}
          onChange={(e) => {
            setExamDescription(e.target.value);
            handleInputChange();
          }}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
          style={{ minHeight: "100px", maxHeight: "300px" }}
        />
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
  );
};

export default AddExam;
