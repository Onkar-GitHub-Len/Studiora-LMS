import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Loading } from "../../Components";

const MyCourse = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-start md:p-8 p-4 pt-8 bg-gray-50">
      <div className="w-full">
        <h2 className="pb-4 text-xl font-semibold text-gray-800">My Courses</h2>

        <div className="w-full overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Course
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Earnings
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Students
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Published
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={course.courseThumbnail}
                      alt="course thumbnail"
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <span className="truncate max-w-[200px] hidden sm:inline-block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice / 100)
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3">
                    {course.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourse;
