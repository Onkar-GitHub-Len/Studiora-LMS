import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets"; // Importing dummy data for courses
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

// Creating a new context to share data across components
export const AppContext = createContext();

// AppContext Provider component
export const AppContextProvide = (props) => {
  // Getting currency from environment variable (e.g., USD, INR)
  const currency = import.meta.env.VITE_CURRENCY;

  const { getToken } = useAuth();
  const { user } = useUser();

  // Hook to navigate programmatically (e.g., navigate("/login"))
  const navigate = useNavigate();

  // State to hold all courses
  const [allCourses, setAllCourses] = useState([]);

  // State to track whether the user is an educator
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Function to simulate fetching courses (you can replace this with an API call later)
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Function to calculate the average rating of a course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0; // If no ratings, return 0
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating; // Summing all ratings
    });
    return totalRating / course.courseRatings.length; // Calculating average
  };

  // function to calculate course chapter time

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate no of lecture in the course

  const calculateNumberOfLectures = (course) => {
    let totalLecuture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLecuture += chapter.chapterContent.length;
      }
    });
    return totalLecuture;
  };

  const fetchUserEnrolledCourses = () => {
    setEnrolledCourses(dummyCourses);
  };

  // useEffect runs once when the component mounts to fetch courses
  useEffect(() => {
    fetchUserEnrolledCourses();
    fetchAllCourses();
  }, []);

  const logToken = async () => {
    console.log(await getToken());
  };

  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);

  // Values to be shared globally via context
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };

  // Returning the context provider with children wrapped inside
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
