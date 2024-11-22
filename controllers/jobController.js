import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UnauthorizedError } from '../errors/customError.js'

export const getAllJobs = async (req,res) => {
    

    const queryObject = {
        createdBy : req.user.userId,
        
    }

   
    const jobs = await Job.find(queryObject)
    res.status(200).json({jobs});
}

export const getJob = async (req,res) => {

    
    
    const {id} = req.params;
    const job = await Job.findById(id)
    
    
    res.status(200).json({job})
}

export const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId
    console.log(req.body);
   const {company,position} = req.body
    const job = await Job.create(req.body)
    res.status(201).json({job});
}

export const updateJob = async (req,res) => {
    const {id} = req.params;
    const job = await Job.findByIdAndUpdate(id,req.body,
        {
            new:true
        }
    )
    
    res.status(200).json({job})

}

export const deleteJob = async (req,res) => {
    const {id} = req.params;
    const job = await Job.findByIdAndDelete(id)
    
    res.status(200).json({job})
}