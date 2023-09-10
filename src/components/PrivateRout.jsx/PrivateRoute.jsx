import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom'
import { selectorAuthenticated } from 'redux/authReduser';


export const PrivateRoute = ({ children, redirectTo= '/login'}) => {
   const  authenticated = useSelector(selectorAuthenticated);
  return (
    authenticated ? children  : <Navigate to= {redirectTo} replace />)
 
}

