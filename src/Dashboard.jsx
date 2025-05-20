import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const books = [
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
];

const chaptersPerDay = 2;

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const handleNext = () => {
    setCurrentBookIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = () => {
    setCurrentBookIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const currentBook = books[currentBookIndex];
  const totalDays = Math.ceil(currentBook.chapters / chaptersPerDay);
  const today = new Date();
  const maxUnlockedDay = 7; // example: allow access only to first 7 days for now (replace with real logic)

  const readDays = [1, 2, 4]; // example: user has read day 1, 2, and 4

  const days = Array.from({ length: totalDays }, (_, i) => ({
    day: i + 1,
    chapters: [
      i * chaptersPerDay + 1,
      Math.min((i + 1) * chaptersPerDay, currentBook.chapters),
    ],
  }));

  const goToDay = (book, day) => {
    navigate(`/plan/${book.toLowerCase()}/day/${day}`);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-bold text-center w-full -ml-10 md:ml-0 md:text-2xl">
          {currentBook.name}
        </h2>
        <button
          onClick={handleNext}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {days.map((dayObj) => {
          const isUnlocked = dayObj.day <= maxUnlockedDay;
          const isRead = readDays.includes(dayObj.day);

          return (
            <div
              key={dayObj.day}
              onClick={() =>
                isUnlocked && goToDay(currentBook.name, dayObj.day)
              }
              className={`relative p-4 rounded shadow transition cursor-${
                isUnlocked ? "pointer" : "not-allowed"
              } ${
                isUnlocked
                  ? "bg-white hover:shadow-md"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p className="font-semibold">Day {dayObj.day}</p>
              <p className="text-sm">Chapters: {dayObj.chapters.join(" - ")}</p>
              {isRead && (
                <CheckCircle className="absolute top-2 right-2 text-green-500 w-5 h-5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
