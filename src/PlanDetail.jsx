import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlanDetail = () => {
  const { book, day } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleMarkAsRead = () => {
    setLoading(true);

    setTimeout(() => {
      // Simulate marking as read in backend or local state
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        {book.charAt(0).toUpperCase() + book.slice(1)} - Day {day}
      </h1>
      <p className="mb-6 text-gray-700">
        You are reading chapters for day {day}. Reflect and pray as you go
        through the passages.
      </p>

      <button
        onClick={handleMarkAsRead}
        disabled={loading}
        className={`px-6 py-3 rounded-md text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } transition`}
      >
        {loading ? "Marking as Read..." : "Mark as Read"}
      </button>

      {loading && (
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      )}
    </div>
  );
};

export default PlanDetail;
