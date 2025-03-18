import mongoose , {Schema} from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    urlApplication: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["live" , "upcoming" , "over"],
        default: "over"
    },
    

},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)