// ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, setUser, children }) => {
  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  // Logged in, render the child component
  return children;
};

export default ProtectedRoute;
