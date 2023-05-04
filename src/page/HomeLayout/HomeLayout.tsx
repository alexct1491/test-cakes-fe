import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../../components/Navbar/Navbar'
import "./Homepage.scss"
export const HomeLayout = () => {
  return (
    <div className='homepage-container'>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
     
    </div>
  )
}
