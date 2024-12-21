import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div>
            <nav className="rounded-lg border shadow-lg overflow-hidden p-2 bg-white border-stone-200 shadow-stone-950/5 sticky top-0 mx-auto w-full max-w-screen-xl">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="font-sans antialiased text-sm text-current ml-2 mr-2 block py-1 font-semibold">
                        Material Tailwind
                    </NavLink>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-4">
                        <NavLink
                            to="/"
                            className="font-sans antialiased text-sm text-current hover:text-primary"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/services"
                            className="font-sans antialiased text-sm text-current hover:text-primary"
                        >
                            Services
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="font-sans antialiased text-sm text-current hover:text-primary"
                        >
                            About
                        </NavLink>
                    </div>

                    {/* Buttons */}
                    <div className="hidden md:flex items-center ml-auto gap-4">
                        <NavLink
                            to="/login"
                            className="text-sm py-1.5 px-3 font-medium rounded-lg bg-stone-800 text-white hover:bg-stone-700"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="text-sm py-1.5 px-3 font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                        >
                            Signup
                        </NavLink>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-stone-800 hover:bg-stone-200 rounded-md"
                    >
                        <svg
                            width="1.5em"
                            height="1.5em"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            className="h-6 w-6"
                        >
                            <path d="M3 5H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M3 12H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M3 19H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <NavLink
                                    to="/"
                                    className="font-sans antialiased text-sm text-current hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/services"
                                    className="font-sans antialiased text-sm text-current hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="font-sans antialiased text-sm text-current hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/login"
                                    className="font-sans antialiased text-sm text-current hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signup"
                                    className="font-sans antialiased text-sm text-current hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Signup
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
