import React from "react";
import PropTypes from 'prop-types';
import { addFilter } from "redux/contactsRedux";
import { useDispatch } from "react-redux";
import css from './Filter.module.css'

export const Filter = ({ value }) => {
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(addFilter(e.currentTarget.value))
  }

    return <div >
      <label className={css.filter}>
        <span> Find contacts by name</span>
  <input className={css.imput} type="text" name="text" value={value} onChange={changeFilter} required />
  </label>
</div>
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}