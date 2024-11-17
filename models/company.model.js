import mongoose from "mongoose"; 

const CompanySchema=new mongoose({
    name: {
        type: String,
        require: true
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
        default: ""
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true 
    }

},{timeStamps: true})

export const Company =mongoose.model("Company",CompanySchema);