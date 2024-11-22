import React from 'react'
import customeFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { FaSuitcaseRolling } from 'react-icons/fa';





export const loader = async () => {
  try {
    const response = await customeFetch.get('/users/admin/app-stats');
    return response.data
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
}

const Admin = () => {
  const { users, jobs} = useLoaderData();
  
  return (
    <div className='row m-5'>
      <div className='col-md-3'></div>
      <div className='col-md-6'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card bg-dark p-5 text-light text-center'>
            <h1><FaSuitcaseRolling /></h1>
              <h1>CURRENT USERS {users}</h1>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card bg-dark p-5 text-light text-center'>
              <h1><FaSuitcaseRolling /></h1>
              <h1>TOTAL JOBS {jobs}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-3'></div>
    </div>
  )
}

export default Admin