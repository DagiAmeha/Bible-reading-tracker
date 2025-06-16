import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Example using axios
    axios
      .get("http://localhost:5000/api/users/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        navigate("/");
        setUser(null);
      });
  };

  return (
    <nav>
      <div className="bg-gray-800 p-4 w-full text-white">
        <div className="max-w-11/12 md:max-w-3/4 container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl md:text-2xl font-bold">
            Home
          </Link>
          {user ? (
            <div className="flex gap-4 sm:gap-8">
              Hi<span>{user?.name.split(" ")[0]}!</span>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          ) : (
            <div className="flex gap-4 sm:gap-8">
              <Link to="/login" className="text-white ">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
