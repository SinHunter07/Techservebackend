import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
    registerApplication,
    getApplication,
    getAllApplications,
    deleteApplication
} from "../controllers/application.controller.js";

const router = Router();

router.post("/register", upload.fields([{ name : "cv" ,
    maxCount: 1
}]), registerApplication);

router.get("/", getAllApplications);

router.get("/:id", getApplication);


// router.patch("/:id", updateApplication);


router.delete("/:id", deleteApplication);

export default router;