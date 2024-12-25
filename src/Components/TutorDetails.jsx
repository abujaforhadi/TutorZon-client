import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import Loading from "./Loading";

const TutorDetails = () => {
  const { details } = useParams();
  const [tutor, setTutor] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://a11server.vercel.app/tutor/${details}`)
      .then((res) => res.json())
      .then((data) => setTutor(data))
      .catch((error) => console.error("Failed to fetch tutor details:", error));
  }, [details]);

  const handleBook = () => {
    if (!user) {
      Swal.fire({
        title: "Error",
        text: "You must be logged in to book a tutor.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (!tutor || !tutor._id) {
      Swal.fire({
        title: "Error",
        text: "Invalid tutor details.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const bookingDetails = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.userEmail,
      BookingEmail: user.email,
      tutorName:tutor.userName,
      
    };

    fetch("https://a11server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Booking successful!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Failed to book the tutor. Please try again later.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  if (!tutor) {
    return <Loading/>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={tutor.image}
        alt={tutor.language}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{tutor.userName}</h2>
      <p className="text-gray-600 mb-2">Language: {tutor.language}</p>
      <p className="text-gray-600 mb-2">Description: {tutor.description}</p>
      <p className="text-gray-600 mb-2">Price: ${tutor.price}</p>
      <p className="text-gray-600 mb-2">Review: {tutor.review}</p>
      <button
        onClick={handleBook}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Book
      </button>
    </div>
  );
};

export default TutorDetails;
