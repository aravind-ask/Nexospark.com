import express from "express";
import {
  createJobApplication,
  getAllApplications,
  getMyApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/jobApplicationController";
import { protect, restrictTo } from "../controllers/authController";

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes for regular users
router.post("/", createJobApplication);
router.get("/my-applications", getMyApplications);
router.get("/:id", getApplication);

// Admin only routes
router.use(restrictTo("admin"));
router.get("/", getAllApplications);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
