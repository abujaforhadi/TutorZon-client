import React from "react";

const About = () => {
  return (
    <div className="min-h-screen    py-12">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-center    mb-8">
          About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: About Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold    mb-4">
              Who We Are
            </h3>
            <p className="text-gray-500  mb-4 leading-relaxed">
              Welcome to <span className="font-bold">TutorZon</span>, your
              trusted platform for connecting students with the best tutors
              worldwide. We are committed to making learning accessible,
              personalized, and efficient for everyone.
            </p>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Our mission is to empower individuals with the knowledge they need
              to achieve their academic and professional goals. Whether you're
              looking to master a new language, excel in academics, or acquire
              technical skills, we have the perfect tutor for you.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Join us in our journey to create a smarter, more connected world
              where learning knows no boundaries.
            </p>
          </div>

          {/* Right Section: Image or SVG */}
          <div className="flex justify-center">
            <img
              src="/aboutus.svg"
              alt="About Us Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold    mb-6 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="   dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold    mb-2">
                Accessibility
              </h4>
              <p className="text-gray-600 dark:text-gray-500">
                We believe that education should be accessible to everyone,
                regardless of location or background.
              </p>
            </div>
            {/* Value 2 */}
            <div className="   dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold    mb-2">
                Personalization
              </h4>
              <p className="text-gray-600 dark:text-gray-500">
                Our platform connects students with tutors tailored to their
                unique learning needs and goals.
              </p>
            </div>
            {/* Value 3 */}
            <div className="   dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold    mb-2">
                Excellence
              </h4>
              <p className="text-gray-600 dark:text-gray-500">
                We strive to provide high-quality learning experiences that help
                students achieve excellence in their fields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
