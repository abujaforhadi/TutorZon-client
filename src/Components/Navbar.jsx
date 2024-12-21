import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router";
import { MdOutlineMenuOpen } from "react-icons/md";
import { AuthContext } from "../Auth/AuthProvider";
import { themeChange } from "theme-change";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        themeChange(false);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch {
            setIsLoggingOut(false);
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Find Tutors", path: "/find-tutors" },
        { name: "Add Tutorials", path: "/add-tutorials", authRequired: true },
        { name: "My Tutorials", path: "/my-tutorials", authRequired: true },
        { name: "My Booked Tutors", path: "/my-booked-tutors", authRequired: true },
    ];

    return (
        <nav className="sticky top-0 w-full bg-white shadow-lg p-2 border-b z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">

                <NavLink
                    to="/"
                    className="text-xl font-bold text-current hover:text-primary"
                >
                    TutorZen
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-4">
                    {navLinks.map(
                        (link) =>
                            (!link.authRequired || user) && (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm text-current hover:text-primary"
                                >
                                    {link.name}
                                </NavLink>
                            )
                    )}
                </div>

                {/* Auth / Theme Toggle */}
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        className="toggle theme-controller"
                        value="dark"
                    />
                    {user ? (
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoURL || "default-avatar-url"}
                                alt={user.displayName || "User"}
                                className="h-8 w-8 rounded-full border cursor-pointer"
                                title={user.displayName}
                            />
                            <button
                                onClick={handleLogout}
                                className="text-sm py-1.5 px-3 bg-red-500 text-white rounded hover:bg-red-400"
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="text-sm py-1.5 px-3 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="text-sm py-1.5 px-3 bg-blue-600 text-white rounded hover:bg-blue-500"
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-current hover:bg-gray-200 rounded"
                >
                    <MdOutlineMenuOpen size={24} />
                </button>
            </div>

            {/* Mobile Links */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4">
                    {navLinks.map(
                        (link) =>
                            (!link.authRequired || user) && (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className="block text-sm text-current hover:text-primary py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            )
                    )}
                    {!user && (
                        <>
                            <NavLink
                                to="/login"
                                className="block text-sm text-current hover:text-primary py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="block text-sm text-current hover:text-primary py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
