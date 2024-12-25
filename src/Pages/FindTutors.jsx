import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AOS from "aos";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    AOS.init();

    const url = category
      ? `https://a11server.vercel.app/find-tutors?language=${category}`
      : "https://a11server.vercel.app/find-tutors";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTutors(data);
      })
      .catch((error) => console.error("Failed to fetch tutors:", error));
  }, [category]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {category ? `${category} Tutors` : "All Tutors"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="border p-4 rounded shadow-lg bg-white"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="relative">
              <img
                src={tutor.image}
                alt={tutor.language}
                className="w-full h-40 object-cover rounded mb-4"
                data-aos="zoom-in"
                data-aos-duration="1500"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded">
                <p className="text-sm font-semibold">{tutor.language}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold" data-aos="fade-up">
              {tutor.userName}
            </h3>
            <h3 className="" data-aos="fade-up">
              Reviews: {tutor.review}
            </h3>
            <p className="text-sm text-gray-600" data-aos="fade-up">
              {tutor.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-bold">USD {tutor.price}</span> / hours
              </p>
              <Link
                to={`/tutor/${tutor._id}`}
                className="text-blue-500 hover:underline"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
