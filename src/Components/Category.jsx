import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router"; 

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const handleCardClick = (language) => {
    navigate(`/find-tutors/${language}`); 
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Language Tutors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between p-4 bg-white text-black shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(category.name)}
          >
            <div className="flex items-center gap-4">
              <img
                src={category.logo}
                alt={category.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-lg font-medium">{category.name} tutors</span>
            </div>
            <MdKeyboardArrowRight />

          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;