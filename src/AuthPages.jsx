import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const AuthForm = ({ title, actionLabel, footerLink, footerText }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, phoneNumber, email, password, passwordConfirm };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/auth/${
          actionLabel == "Sign Up" ? "signup" : "login"
        }`,
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4">
      <h2
        className="absolute top-4 left-10
      text-2xl font-bold text-center mb-6 text-blue-700"
      >
        <a href="/">&larr; Bible Study</a>
      </h2>
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {actionLabel == "Sign Up" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="phone"
                  name="phoneNumber"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {actionLabel == "Sign Up" && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Password Confirm
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition"
          >
            {actionLabel}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">or continue with</p>
            <button className="mt-2 w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100">
              Continue with Google
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {footerText}{" "}
          <Link to={footerLink} className="text-blue-600 hover:underline">
            {footerLink === "/login" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export const SignUp = () => (
  <>
    <AuthForm
      title="Create Your Account"
      actionLabel="Sign Up"
      footerLink="/login"
      footerText="Already have an account?"
    />
  </>
);

export const SignIn = () => (
  <AuthForm
    title="Welcome Back"
    actionLabel="Sign In"
    footerLink="/signup"
    footerText="Don't have an account?"
  />
);

export default SignUp;
