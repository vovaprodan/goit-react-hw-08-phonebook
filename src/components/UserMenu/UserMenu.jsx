import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectorUserData } from 'redux/authReduser';
import css from './UserMenu.module.css'

const UserMenu = () => {
    const dispatch = useDispatch();
  const name = useSelector(selectorUserData);
  return (
      <div>
          <span className={css.user}>Ласкаво просимо {name.email}</span>
          <button className={css.button} type='button' onClick={ () => dispatch(logOut())}>Log Out</button>
    </div> 
  )
}

export default UserMenu