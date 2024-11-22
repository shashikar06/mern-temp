import React, { createContext, useContext } from 'react'
import { toast } from 'react-toastify'

import { useLoaderData } from 'react-router-dom'
import customeFetch from '../utils/customFetch'
import JobsContainer from '../Components/JobsContainer'
import SearchContainer from '../Components/SearchContainer'


export const loader = async () => {
  try {
    const { data } = await customeFetch('/jobs');
    return { data }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData()
 
  return (
    <div>
      <AllJobsContext.Provider value={{ data }}>
        
          <JobsContainer />
          
      </AllJobsContext.Provider>
    </div>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)


export default AllJobs