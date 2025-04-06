import { Router } from "express";
import { getEnquiry, registerEnquiry } from "../controllers/enquiry.controller.js";

const router = Router();

/**
 * @route   POST /api/v1/enquiries
 * @desc    Register a new enquiry
 * @access  Public
 */
router.post("/", registerEnquiry);

/**
 * @route   GET /api/v1/enquiries/:id
 * @desc    Get a single enquiry by ID
 * @access  Public
 */
router.get("/:id", getEnquiry);

export default router; 