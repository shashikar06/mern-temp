import React from 'react'
import styled from 'styled-components'
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <div>
      <nav className='m-3'>
        <img src={logo} alt='jobify' className='img-fluid'/>
      </nav>
      <div className='row'>
        <div className='col-md-6'>
            <div className='container mt-5'>
                <div className='mt-5'>
                  <h1 className='fw-bold'>Job <span className='job'>Tracking</span> App</h1>
                </div>
              </div>
              <div>
                
              </div>
              <div className='mb-5'>
                
              </div>
              <div class="d-grid gap-2 col-4 mx-auto">
                <Link to='/register' className='btn btn-info btn-lg'>Register</Link>
                <Link to='/login' className='btn btn-info btn-lg mt-5'>Login</Link>
              </div>
          </div>
        <div className='col-md-6'>
          <div>
            <img src={main} className='img-fluid' />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Landing