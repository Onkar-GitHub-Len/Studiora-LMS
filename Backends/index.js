import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/mongodb.js";
import { clerkWebHooks } from "./controllers/webHooks.js";

const app = express();

app.use(cors());
// Port
const PORT = process.env.PORT || 8000;

// Connect to database
await connectDb();

// Middleware
app.use(express.json()); // optional, but usually added to parse JSON requests

// Routes
app.get("/", (req, res) => {
    console.log("Home page");
    res.send("API is Working");
});

app.post("/clerk", express.json(), clerkWebHooks)

// Start the server
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
