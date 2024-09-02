"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    applyLink: "",
    jobType: "full-time",
    remote: false,
    jobSector: "Private",
    dueDate: "",
    experience: 0,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Job Details Submitted:", jobDetails);
      const res = await axios.post(
        "http://localhost:8000/api/jobs",
        jobDetails
      ); // Updated URL
      console.log("API Response:", res);

      alert("Job added successfully!");
      router.push("/");
    } catch (error) {
      console.log("Error:", error);
      alert("There was an error adding the job. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Job</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-gray-700 font-medium mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="salary"
            className="block text-gray-700 font-medium mb-2"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.salary}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="applyLink"
            className="block text-gray-700 font-medium mb-2"
          >
            Apply Link
          </label>
          <input
            type="url"
            id="applyLink"
            name="applyLink"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.applyLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="jobType"
            className="block text-gray-700 font-medium mb-2"
          >
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.jobType}
            onChange={handleChange}
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Remote</label>
          <input
            type="checkbox"
            id="remote"
            name="remote"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={jobDetails.remote}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="remote" className="ml-2 text-gray-600">
            Is this a remote job?
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="jobSector"
            className="block text-gray-700 font-medium mb-2"
          >
            Job Sector
          </label>
          <select
            id="jobSector"
            name="jobSector"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.jobSector}
            onChange={handleChange}
            required
          >
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="block text-gray-700 font-medium mb-2"
          >
            Experience (Years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={jobDetails.experience}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
