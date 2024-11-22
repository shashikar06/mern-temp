import React from 'react'

import { Form, redirect,useNavigate,Link } from 'react-router-dom'
import Logo from '../Components/logo'
import customeFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
export const action = async ({ request }) => {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    await customeFetch.post('/auth/register',data)
    toast.success('Registration successful')
    return redirect('/login');

  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

const Register = () => {
  return (
    <div>
      <div className='container-fluid m-2'>
        <Logo/>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <div>
              
              <h1 className='text-center fw-bold'>Register Here</h1>
            </div>
            <Form method='post' className='form'>
                <div className="mb-3">
                  <label for="name" className="form-label">Name</label>
                  <input type="name" className="form-control" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="lastname" className="form-label">Last Name</label>
                  <input type="name" className="form-control" name='lastname' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="location" className="form-label">Location</label>
                  <input type="name" className="form-control" name='location' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' id="exampleInputPassword1" />
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
              </Form>
              <div className='mt-3'>
                <p>Already a Memeber?   
                  <Link to='/login'>Login</Link>
                </p>
              </div>
          </div>
          <div className='col-md-4'>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register