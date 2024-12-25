import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaChalkboardTeacher, FaStar } from "react-icons/fa"; 
import AOS from "aos"; 


const StatsSection = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [tutorsCount, setTutorsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchStats = async () => {
      try {
        const usersResponse = await axios.get("https://a11server.vercel.app/stats/users-count");
        setUsersCount(usersResponse.data.count);

        const tutorsResponse = await axios.get("https://a11server.vercel.app/find-tutors");
        const tutors = tutorsResponse.data;

        setTutorsCount(tutors.length);

        const totalReviews = tutors.reduce((sum, tutor) => sum + (Number(tutor.review) || 0), 0);
        setReviewsCount(totalReviews);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 bg-gray-50">
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

      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <FaStar className="text-4xl text-orange-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-orange-600">{reviewsCount}</h3>
        <p className="text-gray-600 text-lg">Total Reviews</p>
      </div>
    </div>
  );
};

export default StatsSection;