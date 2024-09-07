"use client";
import Navbar from "@/components/Navbar";
import Jobs from "@/components/Jobs";
import Filter from "@/components/Filter";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";

export default function GovernmentJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/jobs");
        const governmentJobs = res.data.data.filter(
          (job) => job.jobSector === "Government"
        );
        setJobs(governmentJobs);
        setFilteredJobs(governmentJobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleFilterChange = (filters) => {
    let updatedJobs = [...jobs];

    // Filter by Location
    if (filters.remote) {
      updatedJobs = updatedJobs.filter((job) => job.remote === true);
    }
    if (filters.onsite) {
      updatedJobs = updatedJobs.filter((job) => job.remote === false);
    }

    // Filter by Job Type
    if (filters["full-time"]) {
      updatedJobs = updatedJobs.filter((job) => job.jobType === "full-time");
    }
    if (filters["part-time"]) {
      updatedJobs = updatedJobs.filter((job) => job.jobType === "part-time");
    }
    if (filters.contract) {
      updatedJobs = updatedJobs.filter((job) => job.jobType === "contract");
    }
    if (filters.internship) {
      updatedJobs = updatedJobs.filter((job) => job.jobType === "internship");
    }

    // Filter by Salary Range
    updatedJobs = updatedJobs.filter(
      (job) =>
        job.salary >= filters.minSalary && job.salary <= filters.maxSalary
    );

    setFilteredJobs(updatedJobs);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const searchedJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowercasedQuery) ||
        job.company.toLowerCase().includes(lowercasedQuery) ||
        job.location.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredJobs(searchedJobs);
  };

  return (
    <div className="w-full lg:max-w-7xl mx-auto flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <SearchBar onSearch={handleSearch} />
          <div className="grid grid-cols-1 md:grid-cols-6">
            <div className="col-span-2">
              <Filter onFilterChange={handleFilterChange} />
            </div>
            <div className="col-span-4">
              <Jobs jobs={filteredJobs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
