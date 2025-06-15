import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const PasswordInput = ({
  name,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block mb-1 font-bold">{name}</label>
      <div className="relative font-light">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 font-light  focus:outline-none focus:ring focus:border-blue-500"
          placeholder={name}
          min={8}
          value={name == "Password" ? password : passwordConfirm}
          onChange={(e) => {
            name == "Password"
              ? setPassword(e.target.value)
              : setPasswordConfirm(e.target.value);
          }}
        />{" "}
        <br />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="button"
          className="absolute right-4 top-2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
export const AuthForm = ({
  title,
  actionLabel,
  footerLink,
  footerText,
  setUser,
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setShow(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { name, phoneNumber, email, password, passwordConfirm };
    if (actionLabel == "Sign Up") {
      if (password !== passwordConfirm) {
        setError("Password and Password Confirm do not match");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/auth/${
          actionLabel == "Sign Up" ? "signup" : "login"
        }`,
        data
      );
      console.log(res);
      if (res.data.status === "success") {
        setUser(res.data.data.user);
        localStorage.setItem("jwt", res.data.token);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`min-h-screen bg-white text-gray-800 flex items-start mt-4 shadow-md justify-center px-4 transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
    >
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {actionLabel == "Sign Up" && (
            <>
              <div>
                <label className="block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g Abebe Tesfaye"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-bold">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    pattern="[0-9]+"
                    placeholder="e.g 912345678"
                    required
                    className="w-full border border-gray-300 rounded pl-12 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <p className="absolute top-2 left-2">+251 </p>
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block mb-1 font-bold">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g example@gmail.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <PasswordInput
            name="Password"
            password={password}
            setPassword={setPassword}
          />
          {actionLabel == "Sign Up" && (
            <PasswordInput
              name="Password Confirm"
              passwordConfirm={passwordConfirm}
              setPasswordConfirm={setPasswordConfirm}
              error={error}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 hover:cursor-pointer transition"
          >
            {actionLabel}
          </button>
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

export const SignUp = ({ setUser }) => (
  <>
    <AuthForm
      title="Create Your Account"
      actionLabel="Sign Up"
      footerLink="/login"
      footerText="Already have an account?"
      setUser={setUser}
    />
  </>
);

export const SignIn = ({ setUser }) => (
  <AuthForm
    title="Welcome Back"
    actionLabel="Sign In"
    footerLink="/signup"
    footerText="Don't have an account?"
    setUser={setUser}
  />
);

export default SignUp;
