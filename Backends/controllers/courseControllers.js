import { Course } from "../models/Course.models.js";
import mongoose from "mongoose";




// Get all published courses
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: "educator" });

        res.json({ success: true, courses });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        const courseData = await Course.findById(id).populate({ path: "educator" });

        // Remove lectureUrl if preview is not free
        courseData.courseContent.forEach((chapter) => {
            chapter.chapterContent.forEach((lecture) => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            });
        });

        res.json({ success: true, courseData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


