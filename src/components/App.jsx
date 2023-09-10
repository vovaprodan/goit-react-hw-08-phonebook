import React, { Suspense, lazy, useEffect } from "react";
import  { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector} from 'react-redux';
import {   selectorIsLoading, selectorError} from '../redux/contactsRedux'
import css from './App.module.css';
import { Link, Route, Routes } from "react-router-dom";
import UserMenu from "./UserMenu/UserMenu";
import { refreshUser, selectorAuthenticated } from "redux/authReduser";
import { PrivateRoute } from "./PrivateRout.jsx/PrivateRoute";
import { PablicRoute } from "./PablicRoute/PablicRoute";


const HomePage = lazy(() => import("../Page/HomePage"));
const ContactsPage = lazy(() => import("../Page/ContactsPage"));
const RegisterPage = lazy(() => import("../Page/RegisterPage"));
const LoginPage = lazy(() => import("../Page/LoginPage"));
const NotFout = lazy(() => import("../Page/NotFout"));


const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectorIsLoading);
  const error = useSelector(selectorError);
  const  authenticated = useSelector(selectorAuthenticated);
 
    useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
 

  return (
    
    <div className={css.div}>
       <nav className={css.nav}>
        <Link className={css.link} to="/">Home</Link>
        {authenticated ? (<>
          <Link className={css.link} to="/contacts">Contacts</Link>
          <UserMenu /></>) :
          (<div className={css.login} ><Link className={css.link} to="/register">Register</Link>
            <Link className={css.link} to="/login">Login</Link></div> )  }
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<PrivateRoute><ContactsPage /></PrivateRoute> } />
        <Route path="/register" element={ <PablicRoute redirectTo="/contacts"><RegisterPage /></PablicRoute>} />
        <Route path="/login" element={<PablicRoute redirectTo="/contacts"><LoginPage /></PablicRoute>} />
        <Route path="*" element={<NotFout />} />
        </Routes>
        
        
    </Suspense>
       
       {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && ( <div>Загрузка</div> )}
      
      <Toaster />
    </div>
  );
  
}
export default App;