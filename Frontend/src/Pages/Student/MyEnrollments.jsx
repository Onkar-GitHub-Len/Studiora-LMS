import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import Footer from "../../Components/Students/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext);
  const navigate = useNavigate();
  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Enrollments
        </h1>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600 uppercase text-sm">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-gray-600 uppercase text-sm">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-gray-600 uppercase text-sm">
                  Completed
                </th>
                <th className="px-6 py-4 text-left text-gray-600 uppercase text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, i) => {
                const prog = progressArray[i] || {
                  lectureCompleted: 0,
                  totalLectures: 1,
                };
                const percent =
                  (prog.lectureCompleted / prog.totalLectures) * 100;
                const complete = prog.lectureCompleted === prog.totalLectures;
                return (
                  <tr
                    key={course._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {course.courseTitle}
                        </p>
                        <Line
                          percent={percent}
                          strokeWidth={4}
                          trailWidth={4}
                          strokeColor={complete ? "#10B981" : "#3B82F6"}
                          trailColor="#E5E7EB"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {prog.lectureCompleted}/{prog.totalLectures} Lectures
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                          complete
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {complete ? "Completed" : "On Going"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="md:hidden space-y-4">
          {enrolledCourses.map((course, i) => {
            const prog = progressArray[i] || {
              lectureCompleted: 0,
              totalLectures: 1,
            };
            const percent = (prog.lectureCompleted / prog.totalLectures) * 100;
            const complete = prog.lectureCompleted === prog.totalLectures;
            return (
              <div
                key={course._id}
                className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {course.courseTitle}
                    </p>
                    <Line
                      percent={percent}
                      strokeWidth={4}
                      trailWidth={4}
                      strokeColor={complete ? "#10B981" : "#3B82F6"}
                      trailColor="#E5E7EB"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{calculateCourseDuration(course)}</span>
                  <span>
                    {prog.lectureCompleted}/{prog.totalLectures} Lectures
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/player/${course._id}`)}
                  className={`w-full text-center py-2 rounded-full font-semibold transition ${
                    complete
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {complete ? "Completed" : "On Going"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;
