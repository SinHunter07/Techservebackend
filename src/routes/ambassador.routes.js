import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerAmbassador, getAmbassador } from "../controllers/ambassador.controller.js";

const router = Router();

/**
 * @route   POST /api/v1/ambassadors
 * @desc    Register a new ambassador
 * @access  Public
 */
router.post("/", upload.single("profilePhoto"), registerAmbassador);

/**
 * @route   GET /api/v1/ambassadors/:id
 * @desc    Get a single ambassador by ID
 * @access  Public
 */
router.get("/:id", getAmbassador);

export default router;