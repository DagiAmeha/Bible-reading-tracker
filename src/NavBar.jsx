import React from "react";

function NavBar() {
  return (
    <nav>
      <div className="bg-gray-800 p-4 w-full">
        <div className="max-w-11/12 md:max-w-3/4 container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl md:text-2xl font-bold">
            Home
          </a>
          <div className="flex gap-4 sm:gap-8">
            <a href="/login" className="text-white ">
              Login
            </a>
            <a href="/signup" className="text-white">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
