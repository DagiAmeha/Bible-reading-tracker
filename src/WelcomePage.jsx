import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          100-Day New Testament Reading Plan
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Stay on track with your spiritual journey. Read through the entire New
          Testament in just 100 days—track your progress and build a
          life-changing habit.
        </p>
        <a
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">
                Daily Progress Tracker
              </h3>
              <p>
                Check off each day’s reading and watch your spiritual momentum
                grow.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Reading Schedule</h3>
              <p>
                Never lose your place. Follow a guided daily reading plan, one
                step at a time.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p>
                Track your reading from any device—whether you’re at home or on
                the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="get-started"
        className="py-20 px-6 bg-blue-600 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Start Your 100-Day Journey Today
        </h2>
        <p className="text-lg mb-6">
          Make reading the New Testament a consistent part of your life.
        </p>
        <a
          href="/signup" // Adjust route as needed
          className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg hover:bg-gray-200 transition"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} 100-Day NT Reading Plan. All rights
        reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
