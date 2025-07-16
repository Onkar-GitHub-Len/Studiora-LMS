import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Coursecard from "./Coursecard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 px-6 md:px-40 bg-white">
      {/* Section Heading */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Learn from the best
      </h2>

      {/* Subheading */}
      <p className="text-sm md:text-base text-gray-500 mt-3 text-center max-w-3xl mx-auto">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        real-world results.
      </p>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {allCourses.slice(0, 4).map((course, index) => (
          <Coursecard key={index} course={course} />
        ))}
      </div>

      {/* Show All Button */}
      <div className="flex justify-center mt-12">
        <Link
          to={`/course-list`}
          onClick={() => scrollTo(0, 0)}
          className="text-gray-700 border border-gray-400 px-8 py-3 rounded hover:bg-gray-100 transition"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
