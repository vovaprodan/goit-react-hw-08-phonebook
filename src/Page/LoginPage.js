import css from './LoginPage.module.css'
import React from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/authReduser';

const LoginPage = () => {
    const dispatch = useDispatch();

    const handleSubmit = evt => {
          
         evt.preventDefault();
         const form = evt.currentTarget;
         const email = form.elements.userEmail.value;
        const password = form.elements.password.value;
        form.reset();
           const formData = {
           email,
           password,
        };
        dispatch(loginUser(formData));
      
     }

  return (
      <div className={css.box}>
        <h1 className={css.title}>Login</h1>
        <form className={css.form}  onSubmit={handleSubmit}>
            <label className={css.input}>
               <span className={css.span} >Email:</span>
                  <input className={css.email} type='email' name='userEmail' placeholder='Enter your email' required />
            </label>
            <label className={css.input}>
                <span  className={css.span}>Password:</span>
                <input className={css.email} type='password' name='password' placeholder='Enter your password' minLength={7} required/>
            </label>
            <button className={css.button} type='submit'>Login</button>
        </form></div>
  )
}

export default LoginPage