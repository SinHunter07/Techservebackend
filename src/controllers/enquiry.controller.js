import { Enquiry } from "../models/enquiry.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerEnquiry = asyncHandler(async (req, res) => {
    const { name, message, email } = req.body;

    if (!name || !message || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const enquiry = await Enquiry.create({
        name,
        email,
        message,
    });

    const createdEnquiry = await Enquiry.findById(enquiry._id);

    return res.status(201).json(
        new ApiResponse(200, createdEnquiry, "Enquiry submitted successfully")
    );
});

const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
        throw new ApiError(404, "Enquiry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, enquiry, "Enquiry retrieved successfully")
    );
});

export { getEnquiry, registerEnquiry };