import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className={`p-4 flex justify-between items-center bg-gray-800`}>
            <Link to="/">
                <h1 className="text-white text-lg">Arcis AI</h1>
            </Link>
            <div className="text-white flex items-center">
                <span className="mr-2">{darkMode ? "Dark" : "Light"} Mode</span>
                <button
                    onClick={handleToggle}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
                >
                    <span
                        className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
                    />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;