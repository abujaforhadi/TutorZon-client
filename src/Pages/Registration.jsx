import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

const Registration = () => {
  const navigate = useNavigate();
  const { createNewUser, ProfileUpdate, loginWithGoogle } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => navigate("/"))
      
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, photo, email, password } = formData;
  
    // Basic password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      // Pass the correct variables
      await createNewUser(email, password, name, photo);
      await ProfileUpdate(name, photo);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };
  


  return (
    <div className="mx-2 md:w-1/3 md:mx-auto">
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 rounded m-2 grid h-24 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
          Sign Up
        </span>
      </div>
      {error && (
        <div className="mb-4 text-red-500 text-center">{error}</div>
      )}
      <form
        onSubmit={handleSignUp}
        className="w-full h-max rounded px-3.5 py-2.5"
      >
        <div className="mb-4 mt-2 space-y-1.5">
          <label
            htmlFor="name"
            className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
          >
            Name
          </label>
          <div className="relative w-full">
            <input
              name="name"
              placeholder="Your Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <div className="mb-4 space-y-1.5">
          <label
            htmlFor="email"
            className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
          >
            Email
          </label>
          <div className="relative w-full">
            <input
              name="email"
              placeholder="someone@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
              required
            />
          </div>
        </div>
        <div className="mb-4 space-y-1.5">
          <label
            htmlFor="password"
            className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              name="password"
              placeholder="************"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>
        </div>
        <div className="mb-4 space-y-1.5">
          <label
            htmlFor="photo"
            className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
          >
            Photo URL
          </label>
          <div className="relative w-full">
            <input
              name="photo"
              placeholder="Photo URL"
              type="url"
              value={formData.photo}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
          Sign Up
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md relative bg-gradient-to-b from-stone-700 to-stone-800 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased border-[#1877F2] bg-[#1877F2] text-white hover:border-[#1877F2] hover:bg-[#1877F2] hover:brightness-110"
      >
        Continue with Google
      </button>
      <div className="w-full px-3.5 pt-2 pb-3.5 rounded text-center">
        <small className="font-sans antialiased text-sm my-1 flex items-center justify-center gap-1 text-stone-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-sans antialiased text-sm text-stone-500 font-bold"
          >
            Sign In
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Registration;
