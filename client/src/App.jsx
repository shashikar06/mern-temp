import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJob,
  Profile,
  Admin,
  EditJob,
  DeleteJob
} from './pages'

import {action as registerAction} from './pages/Register'
import {action as loginAction } from './pages/Login'
import {loader as dashboardLoader } from './pages/DashboardLayout'
import {action as addJobAction } from './pages/AddJob'
import {loader as allJobsLoader } from './pages/AllJobs'
import {loader as editJobLoader } from './pages/EditJob'
import {action as editJobAction } from './pages/EditJob'
import {action as deleteJobAction} from './pages/DeleteJob'
import {loader as adminLoader} from './pages/Admin'
import {action as profileAction} from './pages/Profile'


const router = createBrowserRouter([
  {
    path : '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children : [
      {
        index : true,
        element: <Landing/>
      },
      {
        path : 'register',
        element: <Register/>,
        action: registerAction,
      },
      {
        path : 'login',
        element: <Login />,
        action: loginAction

      },
      {
        path : 'dashboard',
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children:[
          {
            index:true,
            element: <AddJob />,
            action: addJobAction
          },
          {
            path:'stats',
            element:<Stats />
          },
          {
            path:'all-jobs',
            element:<AllJob />,
            loader: allJobsLoader
          },
          {
            path:'profile',
            element:<Profile />,
            action:profileAction
          },
          {
            path:'admin',
            element:<Admin/>,
            loader:adminLoader
          },
          {
            path:'edit-job/:id',
            element:<EditJob />,
            loader:editJobLoader,
            action:editJobAction,
          },
          {
            path:'delete-job/:id',
            action:deleteJobAction
            
          }
        ]
      },
    ]
  },
 
  
])
const App = () => {
  return <RouterProvider router={router}/>
}

export default App