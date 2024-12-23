import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    // Fetch tutors from the backend
    fetch("http://localhost:3000/find-tutors")
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((error) => console.error("Failed to fetch tutors:", error));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Find Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="border p-4 rounded shadow">
            <img
              src={tutor.image}
              alt={tutor.language}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{tutor.userName}</h3>
            <p className="text-sm text-gray-600">Language: {tutor.language}</p>
            <p className="text-sm text-gray-600">Review: {tutor.review}</p>
            <Link to={`/tutor/${tutor.id}`} className="text-blue-500 mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
