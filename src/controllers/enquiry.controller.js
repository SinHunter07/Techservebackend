import { Enquiry } from "../models/enquiry.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerEnquiry = asyncHandler(async (req ,res) => {
    const{name , message  , email} = req.body


    const enquiry = await Enquiry.create ({
        name , 
        email,
        message,
        
    })

    const createdEnquiry = await Enquiry.findById(enquiry._id)

    return res.status(201).json(
        new ApiResponse(200 , createdEnquiry ,"Application form is filled succesfully ")
    )
})

const getEnquiry = asyncHandler(async (req,res) => {
    const enquiry = req.enquiry
    return res.status(200).json(
        new ApiResponse(200,enquiry,"Application form found succefully")
    )
})

export {getEnquiry , registerEnquiry}