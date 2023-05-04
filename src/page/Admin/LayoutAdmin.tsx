import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navbar } from '../../components/Navbar/Navbar'

export const LayoutAdmin = () => {


  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
