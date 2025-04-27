import { Router } from "express";
import { getEnquiry, registerEnquiry } from "../controllers/enquiry.controller.js";

const router = Router();


router.post("/", registerEnquiry);


router.get("/:id", getEnquiry);

export default router; 