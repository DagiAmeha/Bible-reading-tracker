import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import { SignUp, SignIn } from "./AuthPages";
import Dashboard from "./Dashboard";
import PlanDetail from "./PlanDetail";
import NavBar from "./NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan/:book/day/:day" element={<PlanDetail />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </>
  );
};

export default App;
