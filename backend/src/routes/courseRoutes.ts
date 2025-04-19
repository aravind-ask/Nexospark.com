import express from "express";
import { getAllCourses, getCourse } from "../controllers/courseController";

const router = express.Router();

// All routes are public and display-only
router.get("/", getAllCourses);
router.get("/:slug", getCourse);

export default router;
