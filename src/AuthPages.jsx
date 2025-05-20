import React from "react";
import { Link } from "react-router-dom";

export const AuthForm = ({
  title,
  actionLabel,
  onSubmit,
  footerLink,
  footerText,
}) => {
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
  <AuthForm
    title="Create Your Account"
    actionLabel="Sign Up"
    onSubmit={(e) => {
      e.preventDefault(); /* handle signup */
    }}
    footerLink="/login"
    footerText="Already have an account?"
  />
);

export const SignIn = () => (
  <AuthForm
    title="Welcome Back"
    actionLabel="Sign In"
    onSubmit={(e) => {
      e.preventDefault(); /* handle login */
    }}
    footerLink="/signup"
    footerText="Don't have an account?"
  />
);

export default SignUp;
