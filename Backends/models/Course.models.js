import { Schema } from "mongoose";
import mongoose from "mongoose";

// Schema for each lecture inside a chapter
const lectureSchema = new Schema({
    lectureId: { type: String, required: true },              // Unique identifier for the lecture
    lectureTitle: { type: String, required: true },           // Title of the lecture
    lectureDuration: { type: Number, required: true },        // Duration in minutes or seconds
    lectureUrl: { type: String, required: true },             // URL to access the lecture video
    isPreviewFree: { type: Boolean, required: true },         // Whether the lecture is free to preview
    lectureOrder: { type: Number, required: true }            // Order of the lecture in the chapter
}, { _id: false });  // Prevents Mongoose from adding a separate _id to each lecture

// Schema for each chapter containing multiple lectures
const chapterSchema = new Schema({
    chapterId: { type: String, required: true },              // Unique identifier for the chapter
    chapterOrder: { type: Number, required: true },           // Order of the chapter in the course
    chapterTitle: { type: String, required: true },           // Title of the chapter
    chapterContent: [lectureSchema]                           // Array of lectures under the chapter
}, { _id: false });  // Prevents Mongoose from adding a separate _id to each chapter

// Main schema for a course
const courseSchema = new Schema({
    courseTitle: { type: String, required: true },            // Title of the course
    courseDescription: { type: String, required: true },      // Description of the course
    courseThumbnail: { type: String },                        // Optional thumbnail image URL
    coursePrice: { type: Number, required: true },            // Price of the course
    isPublished: { type: Boolean, default: true },            // Whether the course is published
    discount: {                                               // Discount on the course (in %)
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    courseContent: [chapterSchema],                           // Array of chapters in the course
    courseRating: [                                           // Array of ratings from users
        {
            userId: { type: String },                         // User who gave the rating
            rating: { type: Number, min: 1, max: 5 }          // Rating value (1 to 5)
        }
    ],
    educator: { type: String, ref: 'User', required: true },  // Reference to the educator (user ID)
    enrolledStudents: [{ type: String, ref: "User" }]         // Array of user IDs of enrolled students
}, { timestamps: true, minimize: false });                    // Adds createdAt/updatedAt and keeps empty objects

// Creating and exporting the Course model
export const Course = mongoose.model("Course", courseSchema);


