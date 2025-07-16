import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../Components/Students/Loading";
import Coursecard from "../../Components/Students/Coursecard";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/Students/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  // Getting functions and data from context
  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
    currency,
  } = useContext(AppContext);

  // Fetching course data based on the route param `id`
  const fetchCourseData = async () => {
    const findCourse = await allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  // Fetch once on component mount
  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      {/* Gradient Background */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[400px] -z-10 bg-gradient-to-b from-[#DDFBFE] to-white"></div>

        {/* Main Container */}
        <div className="flex md:flex-row flex-col-reverse gap-10 md:px-36 px-8 md:pt-32 pt-20 text-left">
          {/* ===== Left Column ===== */}
          <div className="max-w-2xl text-gray-700 z-10">
            {/* Course Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug">
              {courseData.courseTitle}
            </h1>

            {/* Course Description */}
            <p
              className="pt-4 text-sm md:text-base"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>

            {/* Rating & Enrollment Info */}
            <div className="flex flex-wrap items-center gap-3 pt-5 text-sm text-gray-600">
              {/* Rating Number */}
              <span className="font-semibold text-gray-800">
                {calculateRating(courseData).toFixed(1)}
              </span>

              {/* Stars */}
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
              </div>

              {/* Total Ratings */}
              <span className="text-blue-600">
                ({courseData.courseRatings.length}{" "}
                {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
              </span>

              {/* Total Students */}
              <span>
                {courseData.enrolledStudents.length}{" "}
                {courseData.enrolledStudents.length > 1
                  ? "students"
                  : "student"}
              </span>
            </div>

            {/* Instructor Name */}
            <p className="mt-1 text-sm text-gray-500">
              Course by{" "}
              <span className="text-blue-600 underline font-medium">
                Studiora
              </span>
            </p>

            {/* ===== Course Structure Section ===== */}
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Course Structure
              </h2>
              <div className="pt-5">
                {/* All Chapters */}
                {courseData.courseContent.map((chapter, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg bg-white mb-3 shadow-sm"
                  >
                    {/* Chapter Header */}
                    <div
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => toggleSection(i)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={assets.down_arrow_icon}
                          alt="DownArrow"
                          className={`transform transition-transform w-3 h-3 ${
                            openSections[i] ? "rotate-180" : ""
                          }`}
                        />
                        <p className="font-medium text-sm md:text-base">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {chapter.chapterContent.length} lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    {/* Lectures List */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSections[i] ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="list-disc px-6 py-3 text-sm text-gray-700 border-t border-gray-200">
                        {chapter.chapterContent.map((lecture, idx) => (
                          <li
                            key={idx}
                            className="flex items-start justify-between py-2"
                          >
                            <div className="flex items-start gap-2">
                              <img
                                src={assets.play_icon}
                                alt="Play"
                                className="w-4 h-4 mt-1"
                              />
                              <p>{lecture.lectureTitle}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {lecture.isPreviewFree && (
                                <span
                                  onClick={() => {
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    });
                                  }}
                                  className="text-blue-500 hover:underline cursor-pointer"
                                >
                                  Preview
                                </span>
                              )}
                              <span>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 100,
                                  { units: ["h", "m"], round: true }
                                )}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-20 text-sm md:text-default">
                <h3 className="text-xl font-semibold  text-gray-800">
                  Course Description
                </h3>
                <p
                  className="pt-3 rich-text"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription,
                  }}
                ></p>
              </div>
            </div>
          </div>

          {/* ===== Right Column (For Future Use) ===== */}
          {/* Placeholder for CourseCard, Pricing, CTA, etc. */}

          <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] ">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img
                src={courseData.courseThumbnail}
                alt=""
                className="rounded-2xl "
              />
            )}

            <div className="pt-5">
              <div className="flex items-center gap-2">
                <img
                  src={assets.time_left_clock_icon}
                  alt="timeLeftIcon"
                  className="w-3.5  "
                />
                <p className="text-red-400">
                  <span className="font-medium">5</span> days left at this
                  price!
                </p>
              </div>
              <div className="flex gap-3 items-center pt-2">
                <p className="text-gray-800 md:text-4xl text-2xl font-semibold  ">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="md:text-lg text-gray-500 line-through ">
                  {currency}
                  {courseData.coursePrice}
                </p>
                <p className="md:text-lg text-gray-500 ">{currency}%Off</p>
              </div>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"> </div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"> </div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="" />
                <p>{calculateNumberOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="mg:mt-6 mt-4 w-full  py-3 rounded  bg-blue-600 text-white font-medium ">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-6 ">
              <p className="md:text-xl text-lg font-medium text-gray-800  ">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm  md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
