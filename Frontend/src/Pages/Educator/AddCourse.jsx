import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters[chapters.length - 1].chapterOrder + 1
              : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    }
    if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    }
    if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIdx) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updated = [...chapter.chapterContent];
            updated.splice(lectureIdx, 1);
            return { ...chapter, chapterContent: updated };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    const { lectureTitle, lectureDuration, lectureUrl } = lectureDetails;
    if (!lectureTitle || !lectureDuration || !lectureUrl) {
      alert("Please fill all fields");
      return;
    }

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.chapterId === currentChapterId
          ? {
              ...chapter,
              chapterContent: [...chapter.chapterContent, lectureDetails],
            }
          : chapter
      )
    );

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: collect and submit all course data
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Course Description
            </label>
            <div
              ref={editorRef}
              className="border border-gray-300 rounded-lg p-2 h-40"
            />
          </div>

          {/* Price & Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Course Price ($)
              </label>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thumbnail
              </label>
              <div className="flex items-center space-x-4">
                <label htmlFor="thumbnailImage" className="cursor-pointer">
                  <img
                    src={assets.file_upload_icon}
                    alt="upload"
                    className="w-12 h-12 bg-indigo-100 p-2 rounded-lg"
                  />
                </label>
                <input
                  type="file"
                  id="thumbnailImage"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0"
              min={0}
              max={100}
              className="w-32 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Chapters */}
          <div className="space-y-4">
            {chapters.map((chapter, idx) => (
              <div
                key={chapter.chapterId}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleChapter("toggle", chapter.chapterId)}
                      className="transform transition-transform"
                    >
                      <img
                        src={assets.dropdown_icon}
                        alt="toggle"
                        className={`w-4 h-4 ${
                          chapter.collapsed ? "-rotate-90" : ""
                        }`}
                      />
                    </button>
                    <h2 className="font-semibold text-gray-800">
                      {idx + 1}. {chapter.chapterTitle}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">
                      {chapter.chapterContent.length} Lectures
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChapter("remove", chapter.chapterId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img
                        src={assets.cross_icon}
                        alt="remove chapter"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </div>

                {!chapter.collapsed && (
                  <div className="space-y-2">
                    {chapter.chapterContent.map((lec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <span className="text-gray-700">
                          {i + 1}. {lec.lectureTitle} — {lec.lectureDuration}{" "}
                          mins —{" "}
                          <a
                            href={lec.lectureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline"
                          >
                            View
                          </a>{" "}
                          — {lec.isPreviewFree ? "Free" : "Paid"}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleLecture("remove", chapter.chapterId, i)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <img
                            src={assets.cross_icon}
                            alt=""
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleLecture("add", chapter.chapterId)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      + Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleChapter("add")}
              className="w-full py-2 rounded-lg border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition"
            >
              + Add Chapter
            </button>
          </div>

          {/* Lecture Popup */}
          {showPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 relative">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add Lecture
                </h3>
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">URL</label>
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="preview"
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="preview" className="text-gray-700">
                    Free Preview
                  </label>
                </div>
                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                  Add Lecture
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopUp(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <img
                    src={assets.cross_icon}
                    alt="close"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
