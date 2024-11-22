import mongoose from "mongoose";
import { JOB_STATUS } from "../utils/constants.js";
import { JOB_TYPE } from "../utils/constants.js";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    jobStatus:{
        type:String,
        enum:Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING
    },
    jobType:{
        type:String,
        enum:Object.values(JOB_TYPE),
        default:JOB_TYPE.FULL_TIME
    },
    location:{
        type:String,
        required:true,
        default:'my city'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

export default mongoose.model('Job',jobSchema)

