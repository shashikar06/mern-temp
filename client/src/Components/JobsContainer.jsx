import React from 'react'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs } = data
  
  if(jobs.length === 0) {
    return (
      <div>
        <h2>No Jobs to Display</h2>
      </div>
    )
  }
  return (
   <div className='row'>
    <div className='col-md-1'></div>
    <div className='col-md-10'>
    <div className='row'>
     
     {
       jobs.map((job) => {
         return (
           <div className='col-md-4'>
             <Job key={jobs._id} {...job} />
           </div>
         )
       })
     }
     
   </div>
    </div>
    <div className='col-md-1'></div>
   </div>
  )
}

export default JobsContainer