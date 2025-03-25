import express from "express";
import {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationsByStatus,
    getActiveNotifications
} from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/")
    .post(createNotification)
    .get(getAllNotifications);

router.route("/active").get(getActiveNotifications);

router.route("/status/:status").get(getNotificationsByStatus);

router.route("/:id")
    .get(getNotificationById)
    .put(updateNotification)
    .delete(deleteNotification);

export default router;