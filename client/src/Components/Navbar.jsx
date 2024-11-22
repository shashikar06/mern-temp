import React from 'react'
import { FaHome} from 'react-icons/fa'
import Logo from './logo'
import logo from '../assets/images/logo.svg'
import { Link,useNavigate } from 'react-router-dom'
import customeFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useDashboardContext } from '../pages/DashboardLayout'

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useDashboardContext();
  const { role } = user;
  //console.log(role);
  const logout = async () => {
    navigate('/')
    await customeFetch.get('/auth/logout')
    toast.success('Logging Out')
  }

  if(role !== 'admin'){
    return (
      <nav className="navbar navbar-expand-sm bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/dashboard">JOBIFY</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='all-jobs'>ALLJOBS</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to='profile'>Profile</Link>
            </li>
            
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
            </li>
          </ul>
        </div>
      </div>
  </nav>
    )
  }
  
  return (
    <div>
         <nav className="navbar navbar-expand-sm bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" href="/dashboard">JOBIFY</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='all-jobs'>ALLJOBS</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='profile'>Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='admin'>ADMIN</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar