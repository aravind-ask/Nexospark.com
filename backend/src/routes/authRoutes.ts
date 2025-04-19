import express from "express";
import {
  register,
  login,
  protect,
  restrictTo,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

// Admin only route example
router.get("/admin", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Admin access granted",
  });
});

export default router;
