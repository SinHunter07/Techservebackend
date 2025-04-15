import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerAmbassador, getAmbassador } from "../controllers/ambassador.controller.js";

const router = Router();


router.post("/", upload.single("profilePhoto"), registerAmbassador);

router.get("/:id", getAmbassador);

export default router;