import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import SideBar from '../Components/SideBar'
import customeFetch from '../utils/customFetch'

export const loader = async () => {
 try {
  const { data } = await customeFetch.get('/users/current-user');
  return data;
 } catch (error) {
    return redirect('/');
 }
}

const DashboardContext = createContext();
const DashboardLayout = () => {
  
  const { user } = useLoaderData();
  //console.log(user);

  const[showSidebar,setShowSidebar] = useState(false);
  const [isDarkTheme,setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log('toggle dark theme')
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = () => {
    console.log('logout user');
  }
  return (
    <DashboardContext.Provider value={{
      user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser
    }}>
      <div>
        <Navbar />
        <div>
          <SideBar />
        </div>
        <Outlet context={{ user }}/>
      </div>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout