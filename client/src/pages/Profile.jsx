import React from 'react'
import { Form, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify';
import customeFetch from '../utils/customFetch';
import { FaCircle } from 'react-icons/fa';



export const action = async({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get('avatar');
  if (file && file.size > 50000) {
    toast.error('Image size too large')
    return null;
  }
  try {
    await customeFetch.patch('/users/update-user', formData)
    toast.success('Profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return null;
}




const Profile = () => {
  const { user } = useOutletContext()
  console.log(user);
  const {name,lastName,email,location} = user
  return (
    <div className='mt-2'>
       { 
        user.avatar? <img src={user.avatar} class="rounded mx-auto d-block" alt="..." width={200} height={200}></img> : <FaCircle />
      }
      <Form method='post' encType='multipart/form-data' className='form w-25 mx-auto mt-5'>
          <h4 className='bg-dark text-light p-2 text-center'>UPDATE PROFILE</h4>
          <div>
            <label>Name</label>
            <input type='text' name='name' defaultValue={name} className='form-control' />
          </div>
          <div>
            <label>lastname</label>
            <input type='text' name='lastName' defaultValue={lastName} className='form-control'/>
          </div>
          <div>
            <label>Email</label>
            <input type='email' name='email' defaultValue={email} className='form-control'/>
          </div>
          <div>
            <label>Location</label>
            <input type='text' name='location' defaultValue={location} className='form-control'/>
          </div>
          <div>
            <label htmlFor="avatar">Select image file (max 0.5 MB)</label>
            <input type='file' id='avatar' name='avatar' accept='image/*' className='form-control'/>
          </div>
          <div className='mt-3'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
      </Form>
     
    </div>
  )
}

export default Profile