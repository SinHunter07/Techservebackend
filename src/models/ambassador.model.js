import mongoose , {Schema} from "mongoose";

const ambassadorSchema = new Schema({
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
    profilePhoto: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    about: {
        type:String,
        required: true,
    },
    messageAdmin: {
        type:String
    },
    phone: {
        type: String
    }


},{timestamps:true})

export const Ambassador = mongoose.model("Ambassador",ambassadorSchema)