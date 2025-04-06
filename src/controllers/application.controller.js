import { Application } from "../models/application.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.services.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerApplication = asyncHandler(async (req, res) => {
    const { name, collegeName, email, phoneNumber, appliedPost, message, qualification } = req.body;

    if (!name || !collegeName || !email || !phoneNumber || !appliedPost || !qualification) {
        throw new ApiError(400, "All required fields must be filled");
    }

    let cvLocalPath;
    if (req.files && Array.isArray(req.files.cv) && req.files.cv.length > 0) {
        cvLocalPath = req.files.cv[0].path;
    }

    if (!cvLocalPath) {
        throw new ApiError(400, "CV is required");
    }

    const cv = await uploadOnCloudinary(cvLocalPath);

    const application = await Application.create({
        name,
        collegeName,
        email,
        message,
        phoneNumber,
        cv: cv.url,
        appliedPost,
        qualification
    });

    const createdApplication = await Application.findById(application._id);

    return res.status(201).json(
        new ApiResponse(200, createdApplication, "Application submitted successfully")
    );
});

const getApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res.status(200).json(
        new ApiResponse(200, application, "Application retrieved successfully")
    );
});

const getAllApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, applications, "All applications retrieved successfully")
    );
});

const updateApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, collegeName, email, phoneNumber, appliedPost, message, qualification } = req.body;

    const application = await Application.findById(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (name) application.name = name;
    if (collegeName) application.collegeName = collegeName;
    if (email) application.email = email;
    if (phoneNumber) application.phoneNumber = phoneNumber;
    if (appliedPost) application.appliedPost = appliedPost;
    if (message) application.message = message;
    if (qualification) application.qualification = qualification;

    await application.save();

    return res.status(200).json(
        new ApiResponse(200, application, "Application updated successfully")
    );
});

const deleteApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Application deleted successfully")
    );
});

export { getApplication, registerApplication, getAllApplications, updateApplication, deleteApplication };