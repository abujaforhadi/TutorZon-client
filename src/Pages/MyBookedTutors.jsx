import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const MyBookedTutors = () => {
  const [bookedTutors, setBookedTutors] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3000/bookings")
        .then((res) => res.json())
        .then((data) => {
          const filteredTutors = data.filter(
            (booking) => booking.BookingEmail === user.email
          );
          setBookedTutors(filteredTutors);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]);

  const handleReview = (Data) => {
    const { tutorId } = Data;

    fetch(`http://localhost:3000/tutor/${tutorId}`)
      .then((res) => res.json())
      .then((data) => {
        const currentReview = parseInt(data.review);
        const id = data._id;

        const updatedReview = currentReview !== undefined ? currentReview + 1 : 1;

        const reviewData = { review: updatedReview };

        fetch(`http://localhost:3000/tutor/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        })
          .then((res) => res.json())
          .then((updatedTutorData) => {
            if (updatedTutorData.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review count updated!",
                showConfirmButton: false,
                timer: 1500,
              });

              setBookedTutors((prevTutors) =>
                prevTutors.map((tutor) =>
                  tutor._id === id ? { ...tutor, review: updatedReview } : tutor
                )
              );
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed to update review",
                text: "Please try again later.",
              });
            }
          })
          .catch((error) => {
            console.error("Error updating review:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Something went wrong.",
            });
          });
      })
      .catch((error) => {
        console.error("Error fetching tutor data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch tutor data.",
        });
      });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Booked Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTutors.length > 0 ? (
          bookedTutors.map((tutor) => (
            <div key={tutor._id} className="border p-4 rounded shadow">
              <img
                src={tutor.image}
                alt={tutor.language}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{tutor.tutorName}</h3>
              <p className="text-sm">Language: {tutor.language}</p>
              <p className="text-sm">Price: ${tutor.price}</p>
              <button
                onClick={() => handleReview(tutor)}
                className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
              >
                Review
              </button>
            </div>
          ))
        ) : (
          <p>No booked tutors found</p>
        )}
      </div>
    </div>
  );
};

export default MyBookedTutors;
