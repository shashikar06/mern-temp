import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError();
  
  if(error.status === 404){
    return (
      <div>
        <img src={img} alt='not found' />
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find page you are looking you</p>
        <Link to='/dashboard'>Back Home</Link>
      </div>
    )
  }
  return (
    <div>
        <h3>Something Went Wrong</h3>
      <Link to='/'>Back Home</Link>

    </div>

  )
}

export default Error