import Link from "next/link";

const Jobs = ({ jobs }) => {
  return (
    <div className="space-y-6 mx-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            className="p-6 border-2 border-red-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-lg text-gray-600 mb-2">
              {job.company} - {job.location}
            </p>
            <div className="text-gray-600 mb-4">
              {/* Truncate description to 400 characters */}
              {job.description.length > 100 ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.description.substring(0, 100) + "...",
                  }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {job.jobType}
              </span>
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {job.jobSector}
              </span>
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Experience: {job.experience} years
              </span>
            </div>
            <Link
              href={`/government-jobs/${job._id}`} // Redirect to the job details page
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Read More
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No jobs available at the moment.
        </p>
      )}
    </div>
  );
};

export default Jobs;
