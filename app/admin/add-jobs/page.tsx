"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // Quill's styles
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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

  const [jobList, setJobList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch existing job postings
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://jobradar-backend-1.onrender.com/api/jobs");
        setJobList(response.data.data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

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

  // Handle description change from ReactQuill
  const handleDescriptionChange = (value) => {
    setJobDetails({
      ...jobDetails,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://jobradar-backend-1.onrender.com/api/jobs",
        jobDetails
      );
      alert("Job added successfully!");
    } catch (error) {
      console.log("Error:", error);
      alert("There was an error adding the job. Please try again.");
    }
  };
  // Handle job deletion
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`https://jobradar-backend-1.onrender.com/api/jobs/${jobId}`);
      alert("Job deleted successfully!");
      setJobList(jobList.filter((job) => job._id !== jobId)); // Update job list after deletion
    } catch (error) {
      console.log("Error deleting job:", error);
      alert("There was an error deleting the job. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Add Job */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Add a New Job</h2>
          <form onSubmit={handleSubmit}>
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

              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Job Description
              </label>
              <ReactQuill
                value={jobDetails.description}
                onChange={handleDescriptionChange}
                className="rounded-md"
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

              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Remote
              </label>
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

        {/* Right Column: List of Jobs */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Job Postings</h2>
          {jobList.length > 0 ? (
            <ul className="space-y-4">
              {jobList.map((job) => (
                <li
                  key={job._id}
                  className="p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">
                    {job.company} - {job.location}
                  </p>
                  <p className="text-gray-600">
                    {job.salary ? `$${job.salary}` : "Salary not provided"}
                  </p>
                  <p className="text-gray-600">
                    Experience: {job.experience} years
                  </p>
                  <p className="text-blue-600 mt-2 hover:underline">
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Here
                    </a>
                  </p>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddJob;
