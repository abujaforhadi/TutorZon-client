import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';

const Hero = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="md:mt-10 md:max-h-[60vh] flex items-center justify-center">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                            A social media for learners
                        </p>
                        <h1 className="mt-4 text-3xl font-bold lg:mt-8 sm:text-5xl xl:text-7xl">
                            Connect & learn from the experts
                        </h1>
                        <p className="mt-4 text-base lg:mt-8 sm:text-xl">
                            Grow your career fast with the right mentor.
                        </p>
                        {user ? (
                            <p className="mt-5">
                                Welcome back, {user?.displayName || user?.email}!{' '}
                                <Link to="/find-tutors" className="text-blue-600 transition-all duration-200 hover:underline">
                                    Start Your Learning
                                </Link>
                            </p>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    title="Join for free"
                                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-500 rounded-full lg:mt-16 hover:bg-blue-600 focus:bg-blue-700"
                                    role="button"
                                >
                                    Join for free
                                    <svg
                                        className="w-6 h-6 ml-2 -mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </Link>

                                <p className="mt-5">
                                    Already joined us?{' '}
                                    <Link to="/login" className="text-blue-600 transition-all duration-200 hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>

                    {/* Right Side - Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            className="w-full md:max-h-[70vh] object-cover"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                            alt="Illustration of students learning online"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
