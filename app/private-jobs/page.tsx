"use client";
import Navbar from "@/components/Navbar";
import Jobs from "@/components/Jobs";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";

export default function PrivateJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://jobradar-backend-1.onrender.com/api/jobs");
        const privateJobs = res.data.data.filter(
          (job) => job.jobSector === "Private"
        );
        setJobs(privateJobs);
        setFilteredJobs(privateJobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

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
          <Jobs jobs={filteredJobs} />
        </div>
      )}
    </div>
  );
}
