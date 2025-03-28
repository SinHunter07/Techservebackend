import { Ambassador } from "../models/ambassador.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.services.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

const getAmbassador = asyncHandler(async (req,res) => {
    const ambassador = req.ambassador
    return res.status(200).json(
        new ApiResponse(200,ambassador,"Ambassador found succefully")
    )
})

export {registerAmbassador , getAmbassador};