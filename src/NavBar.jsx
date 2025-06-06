import React from "react";

const NavBar = ({ user, setUser }) => {
  return (
    <nav>
      <div className="bg-gray-800 p-4 w-full">
        <div className="max-w-11/12 md:max-w-3/4 container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl md:text-2xl font-bold">
            Home
          </a>
          {user ? (
            <div className="flex gap-4 sm:gap-8">welcome {user?.name}!</div>
          ) : (
            <div className="flex gap-4 sm:gap-8">
              <a href="/login" className="text-white ">
                Login
              </a>
              <a href="/signup" className="text-white">
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
