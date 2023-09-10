import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectorAuthenticated } from 'redux/authReduser';

export const PablicRoute = ({ children, redirectTo= '/'}) => {
   const  authenticated = useSelector(selectorAuthenticated);
  return (
    authenticated ? <Navigate to= {redirectTo} replace />  : children )
 
}