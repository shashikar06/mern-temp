import React from 'react'
import {  Form, redirect, useNavigation, useOutlet, useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customeFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customeFetch.post('/jobs',data)
    toast.success('Job Added')
    return redirect('all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
  
}

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  return (
    <div>
      
      <Form method='post' className='form'>
        
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
          <div className='mt-5'>
          <h2 className='bg-dark text-light text-center'>ADD JOB</h2>
          </div>
          <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Company</label>
          <input type="text" className="form-control" name='company' />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Position</label>
          <input type="text" className="form-control" name='position'/>
        </div>
        <div className='mb-3'>
        <label for="exampleInputPassword1" className="form-label">Job Status</label>
          <select className="form-select form-select-sm" aria-label=".form-select-sm example" name='jobStatus'>
            <option selected>Open this select menu</option>
            <option value={JOB_STATUS.PENDING}>{JOB_STATUS.PENDING}</option>
            <option value={JOB_STATUS.INTERVIEW}>{JOB_STATUS.INTERVIEW}</option>
            <option value={JOB_STATUS.DECLINED}>{JOB_STATUS.DECLINED}</option>
          </select>
        </div>
        <div className='mb-3'>
        <label for="exampleInputPassword1" className="form-label">Job Type</label>
          <select className="form-select form-select-sm" aria-label=".form-select-sm example" name='jobType'>
            <option selected>Open this select menu</option>
            <option value={JOB_TYPE.FULL_TIME}>{JOB_TYPE.FULL_TIME}</option>
            <option value={JOB_TYPE.PART_TIME}>{JOB_TYPE.PART_TIME}</option>
            <option value={JOB_TYPE.INTERNSHIP}>{JOB_TYPE.INTERNSHIP}</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Location</label>
          <input type="text" className="form-control" name='location'/>
        </div>
  
        <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div className='col-md-4'></div>
        </div>

      </Form>
    </div>
  )
}

export default AddJob