import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const UpdateTutorial = () => {
  const tutor = useLoaderData();
  console.log(tutor);

  const [formData, setFormData] = useState({
    image: tutor.image || '',
    language: tutor.language || '',
    price: tutor.price || '',
    description: tutor.description || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const updatedTutor = {
      ...formData,
      tutorName: tutor.userName,
      email: tutor.userEmail,
      review: tutor.review,
    };

    try {
      const response = await fetch(`https://a11server.vercel.app/My-Tutorials-update/${tutor._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTutor),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Tutor details updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        setError('Failed to update tutor details');
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update tutor details',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      setError('Error updating tutor');
      Swal.fire({
        title: 'Error!',
        text: 'Error updating tutor',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error updating tutor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Update Tutor Information</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium">Name</label>
          <input
            type="text"
            value={tutor.userName}
            readOnly
            className="bg-gray-200 text-gray-600 p-3 rounded-md cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            value={tutor.userEmail}
            readOnly
            className="bg-gray-200 text-gray-600 p-3 rounded-md cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Language</option>
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

        <div className="flex flex-col">
          <label className="text-lg font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
            placeholder="Enter price"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md"
            placeholder="Enter description"
            rows="4"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Review</label>
          <input
            type="text"
            value={tutor.review}
            readOnly
            className="bg-gray-200 text-gray-600 p-3 rounded-md cursor-not-allowed"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-3 px-6 rounded-md w-full md:w-auto`}
            disabled={loading}
          >
            {loading ? <Loading/> : 'Update Tutor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTutorial;
