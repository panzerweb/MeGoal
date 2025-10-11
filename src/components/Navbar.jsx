import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Centered Nav Links */}
        <ul className="flex-1 flex justify-center gap-6 text-lg font-medium">

          {/* Navlink from React-router-dom */}
            <NavLink
                to="/dashboard"
                className={({ isActive, isPending }) =>
                    isPending ? "text-gray-300" : isActive ? "text-green-500" : "text-gray-300"
                }
            >
            Goals
            </NavLink>
            <NavLink
                to="/notes"
                className={({ isActive, isPending }) =>
                    isPending ? "text-gray-300" : isActive ? "text-green-500" : "text-gray-300"
                }
            >
            Notes
            </NavLink>
            <NavLink
                to="/blogs"
                className={({ isActive, isPending }) =>
                    isPending ? "text-gray-300" : isActive ? "text-green-500" : "text-gray-300"
                }
            >
            Blogs
            </NavLink>
            {/* Add more if you want */}
        </ul>

        {/* Profile Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          >
            {/* Simple User Icon (SVG) */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg ring-1 ring-black/5">
              <div className="block px-4 py-2 text-gray-400 hover:text-green-600 rounded-md">
                <Link to="/account">Account Settings</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
