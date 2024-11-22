import React from 'react'
import customeFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

 export const action = async({ params }) => {
  try {
    await customeFetch.delete(`/jobs/${params.id}`);
    toast.success('Job Deleted Successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return redirect('/dashboard/all-jobs');
}

const DeleteJob = () => {
  return (
    <div>DeleteJob</div>
  )
}

export default DeleteJob
