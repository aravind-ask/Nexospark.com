import express from "express";
import {
  createBlog,
  getAllBlogs,
  getAllBlogsAdmin,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { protect, restrictTo } from "../controllers/authController";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:slug", getBlog);

// Protected routes (require authentication)
router.use(protect);

// Employee and Admin routes
router.use(restrictTo("employee", "admin"));
router.post("/", createBlog);
router.get("/admin/all", getAllBlogsAdmin);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
