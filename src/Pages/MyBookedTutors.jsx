import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS

const MyBookedTutors = () => {
  const [bookedTutors, setBookedTutors] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    if (user) {
      axios
        .get(`https://a11server.vercel.app/bookings?email=${user.email}`, { withCredentials: true })
        .then((response) => {
          const filteredTutors = response.data.filter(
            (booking) => booking.BookingEmail === user.email
          );
          setBookedTutors(filteredTutors);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [user]);

  const handleReview = (Data) => {
    const { tutorId } = Data;

    axios
      .get(`https://a11server.vercel.app/tutor/${tutorId}`)
      .then((response) => {
        const data = response.data;
        const currentReview = parseInt(data.review);
        const id = data._id;

        if (data.reviewedBy && data.reviewedBy.includes(user._id)) {
          Swal.fire({
            icon: "info",
            title: "You have already reviewed this tutor!",
            text: "You can only submit one review.",
          });
          return;
        }

        const updatedReview = currentReview !== undefined ? currentReview + 1 : 1;

        const reviewData = {
          review: updatedReview,
          reviewedBy: [...(data.reviewedBy || []), user._id], // Store the user's ID to track their review
        };

        axios
          .patch(`https://a11server.vercel.app/tutor/${id}`, reviewData)
          .then((updatedTutorData) => {
            if (updatedTutorData.data.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review submitted!",
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
                title: "Failed to submit review",
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
    <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">My Booked Tutors</h2>
          <p className="font-serif text-sm dark:text-gray-600">
            Explore the tutors you have booked, and leave reviews if you've completed your sessions.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {bookedTutors.length > 0 ? (
            bookedTutors.map((tutor) => (
              <article
                key={tutor._id}
                className="flex flex-col dark:bg-gray-50"
                data-aos="fade-up" // AOS animation for fade-in effect
                data-aos-duration="1000" // Duration of the animation
              >
                <img
                  alt={tutor.language}
                  className="object-cover w-full h-52 dark:bg-gray-500"
                  src={tutor.image}
                />
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{tutor.tutorName}</h3>
                  <p className="text-xs tracking-wider uppercase text-gray-600">{tutor.language}</p>
                  <p className="text-sm mt-2">Price: ${tutor.price}</p>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>Available for sessions</span>
                    <button
                      onClick={() => handleReview(tutor)}
                      className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                      disabled={tutor.reviewedBy && tutor.reviewedBy.includes(user._id)}
                    >
                      {tutor.reviewedBy && tutor.reviewedBy.includes(user._id)
                        ? "Reviewed"
                        : "Review"}
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No booked tutors found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookedTutors;
