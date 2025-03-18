import mongoose , {Schema} from "mongoose";

const applicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    appliedPost: {
        type: String,
        required: true
    },
    cv: {
        type:String,
    },

    message: {
        type: String,
    },

    qualification: {
        type: String,
        required: true
    }

    

},{timestamps:true})

export const Application = mongoose.model("Application",applicationSchema)