import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import { SignUp, SignIn } from "./AuthPages";
import Dashboard from "./Dashboard";
import PlanDetail from "./PlanDetail";
import NavBar from "./NavBar";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data.data.user);
          setLoading(false); // <-- Move here
        })
        .catch(() => {
          setUser(null);
          setLoading(false); // <-- And here
        });
    }
    setLoading(false); // <-- And here
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("App user:", user);
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={
            <SignIn setUser={setUser} setLoginSuccess={setLoginSuccess} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp setUser={setUser} setLoginSuccess={setLoginSuccess} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard loginSuccess={loginSuccess} />
            </ProtectedRoute>
          }
        />
        <Route path="/plan/:book/day/:day" element={<PlanDetail />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </>
  );
};

export default App;
