import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerAmbassador, getAmbassador } from "../controllers/ambassador.controller.js";

const router = Router();


router.post("/", upload.fields( [{name : "profilePhoto",
    maxCount : 1
}]), registerAmbassador);

router.get("/:id", getAmbassador);

export default router;