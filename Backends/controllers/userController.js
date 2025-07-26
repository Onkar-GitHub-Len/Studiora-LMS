import { User } from "../models/User.models.js";
import { Purchase } from "../models/Purchase.models.js";
import { Course } from "../models/Course.models.js";
import Stripe from "stripe";
import { courseProgress } from "../models/CourseProgress.models.js";

// ================================
// Get Logged-in User Data
// ================================
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId; // Extract userId from auth middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController` });
    }
};

// ================================
// Get All Enrolled Courses for Logged-in User
// ================================
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const userData = await User.findById(userId).populate("enrolledCourses");

        // Check if user exists before accessing properties
        if (!userData) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.status(200).json({ success: true, enrolledCourses: userData.enrolledCourses });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController` });
    }
};

// ================================
// Purchase a Course using Stripe Payment Gateway
// ================================
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { origin } = req.headers; // Frontend origin for redirect URLs
        const userId = req.auth.userId;

        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId);

        // Ensure both user and course exist
        if (!userData || !courseData) {
            return res.json({ success: false, message: "Data Not Found" });
        }

        // Calculate final discounted amount
        const amount = (
            courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100
        ).toFixed(2); // toFixed returns a string

        // Save the purchase record before payment
        const newPurchase = await Purchase.create({
            courseId: courseData._id,
            userId,
            amount,
        });

        // Initialize Stripe
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLowerCase();

        // Stripe requires price in smallest currency unit (like cents/paise)
        const line_items = [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: courseData.courseTitle,
                    },
                    unit_amount: Math.floor(Number(newPurchase.amount) * 100), // Convert to integer (e.g., ₹100.25 → 10025)
                },
                quantity: 1,
            },
        ];

        // Create Stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollements`, // Redirect after payment
            cancel_url: `${origin}/`, // Redirect if cancelled
            line_items,
            mode: "payment",
            metadata: {
                purchaseId: newPurchase._id.toString(), // Store purchase ID for post-payment handling
            },
        });

        res.status(200).json({ success: true, success_url: session.url });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController` });
    }
};

// update user course  progress

export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body

        const progressData = await courseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: "Lecture Already Completed" })
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await courseProgress.create({ userId, courseId, lectureCompleted: [lectureId] })
        }

        res.status(200).json({ success: true, message: "Progress Updated " })

    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController updateUserCourseProgress function` })
    }
}

export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const progressData = await courseProgress.findOne({ userId, courseId })

        res.status(200).json({ success: true, progressData })

    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController getUserCourseProgress function` })

    }
}

//  add user rating to course
export const addUserRating = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, rating } = req.body


        if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
            return res.json({ status: false, message: "inVallid details" })
        }

        try {
            const course = await Course.findById(courseId)
            if (!course) {
                return res.json({ success: false, message: "Course not found." })
            }
            const user = await User.findById(userId)
            if (!user || !user.enrolledCourses.includes(courseId)) {
                return res.json({ success: false, message: "user has not purchased this course" })
            }
            const existingRatingIndex = course.courseRating.findIndex(r => r.userId === userId)

            if (existingRatingIndex > -1) {
                course.courseRating[existingRatingIndex].rating = rating;
            }
            else {
                course.courseRating.push({ userId, rating })
            }
            await course.save()
            return res.status(200).json({ success: true, message: "Rating added" })
        } catch (error) {
            res.status(400).json({ success: false, message: `${error.message} from userController inner addUserRating function` })

        }


    } catch (error) {
        res.status(400).json({ success: false, message: `${error.message} from userController addUserRating function` })
    }
}