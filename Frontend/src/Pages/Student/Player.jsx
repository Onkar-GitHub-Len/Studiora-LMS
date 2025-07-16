import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Components/Students/Footer";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../Components/Students/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getCoursedata = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  useEffect(() => {
    getCoursedata();
  }, [enrolledCourses]);

  return (
    <>
      <div className="p-4 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {/* All Chapters */}
            {courseData &&
              courseData.courseContent.map((chapter, i) => (
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
                          openSection[i] ? "rotate-180" : ""
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
                      openSection[i] ? "max-h-96" : "max-h-0"
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
                              src={
                                false ? assets.blue_tick_icon : assets.play_icon
                              }
                              alt="Play"
                              className="w-4 h-4 mt-1"
                            />
                            <p>{lecture.lectureTitle}</p>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            {lecture.lectureUrl && (
                              <span
                                onClick={() => {
                                  setPlayerData({
                                    ...lecture,
                                    chapter: i + 1,
                                    lecture: idx + 1,
                                  });
                                }}
                                className="text-blue-500 hover:underline cursor-pointer"
                              >
                                Watch
                              </span>
                            )}
                            <span>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
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
          <div className="flex items-center gap-2 py-3 mt-10 semibold">
            <h1 className="text-xl font-boldy ">Rate this Course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* right column */}
        <div className="w-full md:max-w-2xl mx-auto bg-white shadow-md rounded-xl p-4 space-y-4">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video rounded-md"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="font-medium text-sm text-gray-700">
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-sm font-semibold text-blue-600 hover:underline">
                  {false ? "Mark Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <img
                src={courseData ? courseData.courseThumbnail : " "}
                alt="Course Thumbnail"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
