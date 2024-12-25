import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(email, password)
      .then(() => {
        setIsLoading(false);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    loginWithGoogle()
      .then(() => {
        setIsLoading(false);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Google login failed. Try again later.");
      });
  };

  return (
    <div className="my-5 w-full mx-auto rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 max-w-xs">
      <div>
        <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 rounded m-2 grid h-24 place-items-center shadow-none">
          <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
            Sign In
          </span>
        </div>
        <form onSubmit={handleSignIn} className="w-full h-max rounded px-3.5 py-2.5">
          <div className="mb-4 mt-2 space-y-1.5">
            <label
              htmlFor="email"
              className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
            >
              Email
            </label>
            <div className="relative w-full">
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@example.com"
                type="email"
                className="w-full outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                type="password"
                className="w-full outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
              />
            </div>
          </div>
          <label htmlFor="remember" className="mb-4 flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="group shadow-sm shadow-stone-950/5 inline-block relative h-5 w-5 cursor-pointer rounded bg-transparent border border-stone-200 transition-all duration-200 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none hover:shadow-md"
            />
            <p className="font-sans antialiased text-base text-stone-600">
              Remember Me
            </p>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2 px-4 shadow-sm bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2 px-4 shadow-sm relative bg-gradient-to-b from-stone-700 to-stone-800 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 border-[#1877F2] bg-[#1877F2] text-white hover:brightness-110"
        >
          
          Continue with Google
        </button>
        <div className="w-full px-3.5 pt-2 pb-3.5 rounded text-center">
          <small className="font-sans antialiased text-sm my-1 flex items-center justify-center gap-1 text-stone-600">
            Don't have an account?
            <Link
              to="/signup"
              className="font-sans antialiased text-sm text-stone-500 font-bold"
            >
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
