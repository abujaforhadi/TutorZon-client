import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const AddTutorials = () => {
  const [formData, setFormData] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
    review: "0",
    userEmail: "",
    userName: "",
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userEmail: user.email,
        userName: user.displayName || "Default User",
      }));
    }
  }, [user]);

  const validateForm = () => {
    const requiredFields = ["image", "language", "price", "description"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          title: "Validation Error",
          text: `Please fill in the ${field} field.`,
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    fetch("https://a11server.vercel.app/find-tutors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Tutorial added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setFormData({
            image: "",
            language: "",
            price: "",
            description: "",
            review: "0",
            userEmail: user?.email || "",
            userName: user?.displayName || "",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to add tutorial. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Tutorial</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-5">
          <label htmlFor="userName" className="block text-sm text-primary">
            Name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.userName}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="userEmail" className="block text-sm text-primary">
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.userEmail}
            readOnly
          />
        </div>

        {/* Image URL */}
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm text-primary">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            id="image"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* Language */}
        <div className="mb-5">
          <label htmlFor="language" className="block text-sm text-primary">
            Language
          </label>
          <select
            name="language"
            id="language"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="Arabic">Arabic</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="French">French</option>
            <option value="Chinese">Chinese</option>
            <option value="Portuguese">Portuguese</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-5">
          <label htmlFor="price" className="block text-sm text-primary">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label htmlFor="description" className="block text-sm text-primary">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Review */}
        <div className="mb-5">
          <label htmlFor="review" className="block text-sm text-primary">
            Review
          </label>
          <input
            type="text"
            name="review"
            id="review"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.review}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTutorials;
