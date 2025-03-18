import { Application } from "../models/application.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerApplication = asyncHandler(async (req ,res) => {
    const{name , collegeName  , email , phoneNumber , cv ,appliedPost,message ,qualification} = req.body


    let cvLocalPath
    if(req.files && Array.isArray(req.files.cv)&& req.files.cv.length > 0){
        cvLocalPath = req.files.cv[0].path
    } 

    if(!cvLocalPath){
        throw new ApiError(400,"CV field is required")
    }

    const application = await Application.create ({
        name , 
        collegeName,
        email,
        message,
        phoneNumber,
        cv,
        appliedPost,
        qualification
    })

    const createdApplication = await Application.findById(application._id)

    return res.status(201).json(
        new ApiResponse(200 , createdApplication ,"Application form is filled succesfully ")
    )
})

const getApplication = asyncHandler(async (req,res) => {
    const application = req.application
    return res.status(200).json(
        new ApiResponse(200,application,"Application form found succefully")
    )
})

export {getApplication , registerApplication}