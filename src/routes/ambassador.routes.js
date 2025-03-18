import { Router } from "express";
import { getAmbassador , registerAmbassador } from "../controllers/ambassador.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
        name: "profilePhoto",
        maxcount: 1
    }]), registerAmbassador
)

export default router