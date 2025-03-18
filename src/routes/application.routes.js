import { upload } from "../middlewares/multer.middleware.js";
import { registerApplication } from "../controllers/application.controller.js";
import { Router } from "express";

const router = Router()

router.route("/registerApplication").post(
    upload.fields([{
        name: "cv",
        maxcount: 1
    }]),registerApplication
)

export default router