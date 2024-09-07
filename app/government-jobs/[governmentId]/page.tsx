"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const JobDetailPage = ({ params }) => {
  const { governmentId } = params; // Get jobId from URL params
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Make sure router is correctly defined

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/jobs/${governmentId}`
        );
        setJob(response.data.data); // Access job data inside `data`
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [governmentId]);

  if (loading) {
    return <p className="text-center mt-10">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center mt-10">Job not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Job Title */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{job.title}</h1>

        {/* Company and Location */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="text-lg font-semibold text-blue-600">{job.company}</p>
          <p className="text-lg text-gray-500">{job.location}</p>
        </div>

        {/* Job Description */}
        <div
          className="text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Experience Required:</p>
            <p className="text-gray-800">{job.experience} years</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Salary:</p>
            <p className="text-gray-800">${job.salary.toLocaleString()}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Job Type:</p>
            <p className="text-gray-800 capitalize">{job.jobType}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Job Sector:</p>
            <p className="text-gray-800 capitalize">{job.jobSector}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Remote:</p>
            <p className="text-gray-800">{job.remote ? "Yes" : "No"}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 font-medium">Application Deadline:</p>
            <p className="text-gray-800">
              {new Date(job.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Apply Button */}
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Apply Here
        </a>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="ml-4 text-blue-500 hover:underline mt-4"
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
};

export default JobDetailPage;
