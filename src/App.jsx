import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import WelcomePage from "./WelcomePage";
import { SignUp, SignIn } from "./AuthPages";
import Dashboard from "./Dashboard";
import PlanDetail from "./PlanDetail";
import NavBar from "./NavBar";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<SignIn user={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan/:book/day/:day" element={<PlanDetail />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </>
  );
};

export default App;
