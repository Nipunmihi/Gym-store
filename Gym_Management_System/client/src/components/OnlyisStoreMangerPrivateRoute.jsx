import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyAdminPrivateRoute() {

    const { currentUser } = useSelector((state) => state.user);
    return currentUser &&  currentUser.isStoreManger ? <Outlet/> : <Navigate to='/sign-in'/>
  
}
 