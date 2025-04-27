import { Ambassador } from "../models/ambassador.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.services.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const registerAmbassador = asyncHandler(async (req ,res) => {

    const{name , collegeName  , email ,about ,phone} = req.body

   let profilePhotolocalpath
   if(req.files && Array.isArray(req.files.profilePhoto)&& req.files.profilePhoto.length > 0){
    profilePhotolocalpath = req.files.profilePhoto[0].path
} 

    if(!profilePhotolocalpath) {
        throw new ApiError(400 , "Profile Photo is required")
    }

    const profilePhoto = await uploadOnCloudinary(profilePhotolocalpath)

    const ambassador = await Ambassador.create ({
        name , 
        collegeName,
        email,
        about,
        phone,
        profilePhoto: profilePhoto.url

    })

    const createdAmbassador = await Ambassador.findById(ambassador._id)

    return res.status(201).json(
        new ApiResponse(200 , createdAmbassador ,"Ambassador form is filled succesfully ")
    )
})

const getAmbassador = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        throw new ApiError(400, "Please provide an ambassador ID in the URL. Example: /api/v1/ambassadors/65f1234567890abcdef12345");
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid ambassador ID format. Please provide a valid MongoDB ID.");
    }

    const ambassador = await Ambassador.findById(id);

    if (!ambassador) {
        throw new ApiError(404, `No ambassador found with ID: ${id}`);
    }

    return res.status(200).json(
        new ApiResponse(200, ambassador, "Ambassador found successfully")
    );
})

const getAllAmbassadors = asyncHandler(async (req, res) => {
    const ambassadors = await Ambassador.find({});
    
    return res.status(200).json(
        new ApiResponse(200, ambassadors, "All ambassadors fetched successfully")
    );
});

export {registerAmbassador, getAmbassador, getAllAmbassadors};