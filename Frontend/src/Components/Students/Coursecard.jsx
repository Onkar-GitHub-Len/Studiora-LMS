import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

const  Coursecard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  // Calculating discounted price
  const finalPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white transform scale-105"
    >
      {/* Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-40 object-cover"
      />

      {/* Course Details */}
      <div className="p-4 text-left space-y-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {course.courseTitle}
        </h3>

        {/* Educator Name */}
        <p className="text-sm text-gray-500">{course.educator.name}</p>

        {/* Rating Section */}
        <div className="flex items-center space-x-2">
          {/* Average rating */}
          <p className="text-sm font-medium text-gray-700">
            {calculateRating(course).toFixed(1)}
          </p>

          {/* Star icons */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>

          {/* Total number of ratings */}
          <p className="text-sm text-gray-500">
            ({course.courseRatings.length})
          </p>
        </div>

        {/* Price after discount */}
        <p className="text-base font-semibold text-gray-900">
          {currency} {finalPrice}
        </p>
      </div>
    </Link>
  );
};

export default Coursecard;
