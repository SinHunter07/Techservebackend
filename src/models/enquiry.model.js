import mongoose , {Schema} from "mongoose";

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type:String,
        enum:["READ" , "UNREAD"],
        default: "UNREAD"
        
    },
    message: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    

},{timestamps:true})

export const Enquiry = mongoose.model("Enquiry",enquirySchema)