import mongoose from "mongoose";


const ApplicationSchema=new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        require: true 
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        require: true
    },
    status: {
        type: String,
        enum: ["Pending","Accepted","Rejected"],
        require: true,
        default: "Pending"
    }

},{timestamps: true}) 
 



export const Applications=mongoose.model("Applications",ApplicationSchema);




