import express from "express";
import {
  getAllProducts,
  getProduct,
  getFeaturedProducts,
} from "../controllers/productController";

const router = express.Router();

// All routes are public and display-only
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:slug", getProduct);

export default router;
