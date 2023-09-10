import css from './LoginPage.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/authReduser';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const handleSubmit = evt => {
         evt.preventDefault();
         const form = evt.currentTarget;
         const name = form.elements.userName.value;
         const email = form.elements.userEmail.value;
        const password = form.elements.password.value;
        form.reset();
        const formData = {
           name,
           email,
           password,
        };
        dispatch(registerUser(formData));
     }

    return (<div className={css.box}>
    <h1 className={css.title}>RegisterPage</h1>
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.input}>
               <span className={css.span}>UserName:</span> 
                <input className={css.email} type='text' name='userName' placeholder='Enter your name'/>
            </label>
            <label className={css.input}>
               <span className={css.span}>Email:</span> 
                <input className={css.email} type='email' name='userEmail' placeholder='Enter your email' required/>
            </label>
            <label className={css.input}>
                <span className={css.span}> Password:</span> 
                <input className={css.email} type='password' name='password' placeholder='Enter your password' minLength={7} required/>
            </label>
            <button className={css.button} type='submit'>Register</button>
        </form> 
    </div>
      
  )
}

export default RegisterPage