// ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, setUser, children }) => {
  console.log("ProtectedRoute user:", user);
  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  // Logged in, render the child component
  return children;
};

export default ProtectedRoute;
