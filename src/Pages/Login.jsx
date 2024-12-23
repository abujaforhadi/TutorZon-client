import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { login, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = new FormData(e.target);
       
        const email = form.get("email");
        const password = form.get("password");

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
                    <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">Sign In</span>
                </div>
                <form className="w-full h-max rounded px-3.5 py-2.5">
                    <div className="mb-4 mt-2 space-y-1.5">
                        <label for="email" className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold">Email</label>
                        <div className="relative w-full">
                            <input name="email" placeholder="someone@example.com" type="email" className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer" />
                        </div>
                    </div>
                    <div className="mb-4 space-y-1.5">
                        <label for="password" className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold">Password</label>
                        <div className="relative w-full">
                            <input name="password" placeholder="************" type="password" className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer" />
                        </div>
                    </div>
                    <label for="remember" className="mb-4 flex items-center gap-2">
                        <label className="group shadow-sm shadow-stone-950/5 inline-block relative h-5 w-5 cursor-pointer rounded bg-transparent border border-stone-200 transition-all duration-200 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none hover:shadow-md text-stone-50" for="remember">
                            <input id="remember" type="checkbox" />
                            <span className="pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4 scale-75 opacity-0 transition-all duration-200 ease-in"><svg fill="none" width="18px" height="18px" stroke-width="2" color="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </span>
                        </label>
                        <p className="font-sans antialiased text-base text-stone-600">Remember Me</p>
                    </label>

                    <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">Sign In</button>

                </form>
                <button onClick={handleGoogleLogin} className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md relative bg-gradient-to-b from-stone-700 to-stone-800 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased border-[#1877F2] bg-[#1877F2] text-white hover:border-[#1877F2] hover:bg-[#1877F2] hover:brightness-110">
                    Continue with Google</button>

                <div className="w-full px-3.5 pt-2 pb-3.5 rounded text-center">
                    <small className="font-sans antialiased text-sm my-1 flex items-center justify-center gap-1 text-stone-600">Don't have an account?
                        <Link to="/signup" className="font-sans antialiased text-sm text-stone-500 font-bold">Sign up</Link>
                    </small>
                </div>
            </div>
            <div>

            </div>
        </div>

    );
};

export default Login;