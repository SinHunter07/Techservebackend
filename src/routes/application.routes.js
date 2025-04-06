import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    registerApplication,
    getApplication,
    getAllApplications,
    updateApplication,
    deleteApplication
} from "../controllers/application.controller.js";

const router = Router();

/**
 * @route   POST /api/v1/applications
 * @desc    Register a new application
 * @access  Public
 */
router.post("/", upload.single("cv"), registerApplication);

/**
 * @route   GET /api/v1/applications
 * @desc    Get all applications
 * @access  Public
 */
router.get("/", getAllApplications);

/**
 * @route   GET /api/v1/applications/:id
 * @desc    Get a single application by ID
 * @access  Public
 */
router.get("/:id", getApplication);

/**
 * @route   PATCH /api/v1/applications/:id
 * @desc    Update an application
 * @access  Public
 */
router.patch("/:id", updateApplication);

/**
 * @route   DELETE /api/v1/applications/:id
 * @desc    Delete an application
 * @access  Public
 */
router.delete("/:id", deleteApplication);

export default router;