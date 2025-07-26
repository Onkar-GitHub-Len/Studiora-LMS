import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkWebHooks, stripeWebHooks } from "./controllers/webHooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoute.js";

const app = express();

// Connect to DB and Cloudinary
await connectDb();
await connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Routes
app.get("/", (req, res) => {
    console.log("Home page");
    res.send("API is Working");
});

app.post("/clerk", express.json(), clerkWebHooks);

// Apply Clerk auth only to protected routes
app.use("/api/educator", clerkMiddleware(), educatorRouter);

// Public route (no Clerk)
app.use("/api/course", courseRouter);
app.use("/api/user", clerkMiddleware(), userRouter)

// Optional: Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
app.post("/stripe", express.raw({type:'application/json'}),stripeWebHooks)


// Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
