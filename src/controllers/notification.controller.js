import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createNotification = asyncHandler(async (req, res) => {
    const { title, Description, urlApplication, status } = req.body;

    if (!title || !Description || !urlApplication) {
        throw new ApiError(400, "Title, Description, and URL are required");
    }

    const notification = await Notification.create({
        title,
        Description,
        urlApplication,
        status: status || "over"
    });

    return res.status(201).json(
        new ApiResponse(201, notification, "Notification created successfully")
    );
});

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notifications, "Notifications retrieved successfully")
    );
});

const getNotificationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(200, notification, "Notification retrieved successfully")
    );
});

const updateNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, Description, urlApplication, status } = req.body;

    const notification = await Notification.findById(id);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    if (title) notification.title = title;
    if (Description) notification.Description = Description;
    if (urlApplication) notification.urlApplication = urlApplication;
    if (status) notification.status = status;

    await notification.save();

    return res.status(200).json(
        new ApiResponse(200, notification, "Notification updated successfully")
    );
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Notification deleted successfully")
    );
});

const getNotificationsByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;

    if (!["live", "upcoming", "over"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const notifications = await Notification.find({ status }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notifications, `Notifications with status ${status} retrieved successfully`)
    );
});


const getActiveNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({
        status: { $in: ["live", "upcoming"] }
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notifications, "Active notifications retrieved successfully")
    );
});

export {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationsByStatus,
    getActiveNotifications
};