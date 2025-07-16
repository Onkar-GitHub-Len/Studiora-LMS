import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import { Loading } from "../../Components";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashBoardData, setDashBoardData] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setDashBoardData(dummyDashboardData);
  }, []);

  if (!dashBoardData) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10 space-y-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800">
        Dashboard Overview
      </h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: assets.patients_icon,
            label: "Total Enrollments",
            value: dashBoardData.enrolledStudentsData.length,
            color: "text-blue-600",
          },
          {
            icon: assets.appointments_icon,
            label: "Total Courses",
            value: dashBoardData.totalCourses.length,
            color: "text-green-600",
          },
          {
            icon: assets.earning_icon,
            label: "Total Earnings",
            value: `${currency} ${dashBoardData.totalEarnings}`,
            color: "text-yellow-600",
          },
          {
            icon: assets.patients_icon,
            label: "Repeat Enrollments",
            value: dashBoardData.enrolledStudentsData.length,
            color: "text-purple-600",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img src={card.icon} alt="" className="w-12 h-12" />
            <div>
              <p className={`text-3xl font-semibold ${card.color}`}>
                {card.value}
              </p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Enrollments */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Latest Enrollments</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Course Title
                </th>
              </tr>
            </thead>
            <tbody>
              {dashBoardData.enrolledStudentsData.slice(0, 6).map((item, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-700">{i + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={item.student.imageUrl}
                      alt={item.student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {item.student.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.courseTitle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
