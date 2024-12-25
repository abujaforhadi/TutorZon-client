import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaChalkboardTeacher, FaStar, FaLanguage } from "react-icons/fa"; 
import AOS from "aos"; 
import "aos/dist/aos.css";

const StatsSection = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [tutorsCount, setTutorsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [languagesCount, setLanguagesCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchStats = async () => {
      try {
        // Fetch users count
        const usersResponse = await axios.get("https://a11server.vercel.app/stats/users-count");
        setUsersCount(usersResponse.data.count);

        // Fetch tutors
        const tutorsResponse = await axios.get("https://a11server.vercel.app/find-tutors");
        const tutors = tutorsResponse.data;
        setTutorsCount(tutors.length);

        // Calculate total reviews
        const totalReviews = tutors.reduce((sum, tutor) => sum + (Number(tutor.review) || 0), 0);
        setReviewsCount(totalReviews);

        // Fetch languages
        const languagesResponse = await axios.get("https://a11server.vercel.app/category");
        setLanguagesCount(languagesResponse.data.length);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-4 ">
      {/* Total Users */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
      >
        <FaUsers className="text-4xl text-orange-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-orange-600">{usersCount}</h3>
        <p className="text-gray-600 text-lg">Total Users</p>
      </div>

      {/* Total Tutors */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <FaChalkboardTeacher className="text-4xl text-orange-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-orange-600">{tutorsCount}</h3>
        <p className="text-gray-600 text-lg">Total Tutors</p>
      </div>

      {/* Total Reviews */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <FaStar className="text-4xl text-orange-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-orange-600">{reviewsCount}</h3>
        <p className="text-gray-600 text-lg">Total Reviews</p>
      </div>

      {/* Total Languages */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <FaLanguage className="text-4xl text-orange-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-orange-600">{languagesCount}</h3>
        <p className="text-gray-600 text-lg">Total Languages</p>
      </div>
    </div>
  );
};

export default StatsSection;
