import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axios from "axios";

const MyTutorials = () => {
  const [bookedTutors, setBookedTutors] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`https://a11server.vercel.app/my-tutorials?email=${user.email}`, { withCredentials: true })
        .then((response) => {
          const filteredTutors = response.data.filter(
            (tutor) => tutor.userEmail === user.email
          );
          setBookedTutors(filteredTutors);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          Swal.fire("Error!", "Failed to fetch tutorials.", "error");
        });
    }
  }, [user]);

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This tutorial will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://a11server.vercel.app/My-Tutorials-delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setBookedTutors(bookedTutors.filter((tutor) => tutor._id !== id));
          Swal.fire("Deleted!", "Your tutorial has been deleted.", "success");
        })
        .catch((error) => {
          console.error("Error deleting tutor:", error);
          Swal.fire("Error!", "Failed to delete the tutorial.", "error");
        });
    }
  });
};


  const handleUpdate = (id) => {
    navigate(`/update-tutor/${id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Tutorials</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Language</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Review</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookedTutors.length > 0 ? (
              bookedTutors.map((tutor) => (
                <tr key={tutor._id}>
                  <td className="border px-4 py-2">{tutor.tutorName}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={tutor.image}
                      alt={tutor.tutorName}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">{tutor.language}</td>
                  <td className="border px-4 py-2">${tutor.price}</td>
                  <td className="border px-4 py-2">{tutor.description}</td>
                  <td className="border px-4 py-2">{tutor.review}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleUpdate(tutor._id)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No tutorials found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTutorials;
