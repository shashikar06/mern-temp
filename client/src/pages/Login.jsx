import React from 'react'
import { Form, redirect,useNavigate,Link } from 'react-router-dom'
import Logo from '../Components/logo'
import { toast } from 'react-toastify'
import customeFetch from '../utils/customFetch'


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customeFetch.post('/auth/login', data);
    toast.success('Login Successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
  
}

const Login = () => {
  return (
    <div>
       <div className='container-fluid m-2'>
        <Logo/>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <div>
              
              <h1 className='text-center fw-bold'>Login Here</h1>
            </div>
            <Form method='post' className='form'>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
              </Form>
              <div className='mt-3'>
                <p>Not a Member yet?   
                  <Link to='/register'>Register</Link>
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

export default Login