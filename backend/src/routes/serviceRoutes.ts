import express from "express";
import {
  createService,
  getAllServices,
  getAllServicesAdmin,
  getService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../controllers/serviceController";
import { protect, restrictTo } from "../controllers/authController";

const router = express.Router();

// Public routes
router.get("/", getAllServices);
router.get("/:slug", getService);

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo("admin"));

router.post("/", createService);
router.get("/admin/all", getAllServicesAdmin);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);
router.patch("/:id/toggle-status", toggleServiceStatus);

export default router;
