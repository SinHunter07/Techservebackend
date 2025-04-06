import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const errorHandler = (err, req, res, next) => {
   
    console.error("Error:", err);

  
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json(
            new ApiResponse(400, null, "Validation Error", errors)
        );
    }

    
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json(
            new ApiResponse(400, null, `Duplicate ${field} value`)
        );
    }

    
    if (err.name === "CastError") {
        return res.status(400).json(
            new ApiResponse(400, null, "Invalid ID format")
        );
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(
            new ApiResponse(err.statusCode, null, err.message)
        );
    }

   
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json(
            new ApiResponse(401, null, "Invalid token")
        );
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json(
            new ApiResponse(401, null, "Token expired")
        );
    }

    
    if (err.name === "MulterError") {
        return res.status(400).json(
            new ApiResponse(400, null, "File upload error", err.message)
        );
    }

    
    return res.status(500).json(
        new ApiResponse(500, null, "Internal Server Error")
    );
}; 