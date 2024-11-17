import mongoose from "mongoose";

const JobSchema=new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    requirements: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    jobTitle: {
        type: String,
        require: true
    },
    noOfPositions: {
        type: Number,
        require: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    applications:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applications",

    }

})

export const Job=mongoose.model("Job",JobSchema);