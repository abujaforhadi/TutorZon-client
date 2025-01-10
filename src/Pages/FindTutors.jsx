import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AOS from "aos";
import { FaSearch } from "react-icons/fa";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const { category } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    AOS.init();

    const url = category
      ? `https://a11server.vercel.app/find-tutors?language=${category}`
      : "https://a11server.vercel.app/find-tutors";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setFilteredTutors(data);
      })
      .catch((error) => console.error("Failed to fetch tutors:", error));
  }, [category]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = tutors.filter((tutor) => 
      tutor.language.toLowerCase().includes(query)
    );
    setFilteredTutors(filtered);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? `${words.slice(0, 10).join(" ")}...`
      : description;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {category ? `${category} Tutors` : "Find Your Perfect Tutor"}
      </h2>

      {/* Search Field */}
      <fieldset className="w-full space-y-1 py-1 my-5">
        <label htmlFor="Search" className="hidden">Search</label>
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-500 w-5 h-5" />
          </span>
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            name="Search"
            placeholder="Search by language..."
            className="w-full py-2 pl-10 pr-4 text-sm rounded-full shadow focus:outline-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      </fieldset>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transform hover:scale-105 transition duration-300"
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
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  {tutor.language}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {tutor.userName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {truncateDescription(tutor.description)}
              </p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-800 dark:text-gray-300 font-semibold">
                  <span className="text-blue-600 dark:text-blue-400">USD {tutor.price}</span> / hour
                </p>
                <Link
                  to={`/tutor/${tutor._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ⭐ {tutor.review} Reviews
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tutors found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindTutors;
