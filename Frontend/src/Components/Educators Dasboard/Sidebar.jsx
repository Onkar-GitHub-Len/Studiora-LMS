import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-20 min-h-screen bg-white border-r border-gray-200 shadow-sm py-6 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-6 hidden md:block text-blue-600">
          Educator Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                `flex items-center transition-all duration-200 ease-in-out md:justify-start justify-center md:gap-4 gap-0 px-4 py-3 rounded-r-full group ${
                  isActive
                    ? "bg-indigo-100 text-blue-600 font-semibold border-r-4 border-indigo-500"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <img
                src={item.icon}
                alt={`${item.name} icon`}
                className="w-6 h-6"
              />
              <span className="hidden md:inline-block">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    )
  );
};

export default Sidebar;
