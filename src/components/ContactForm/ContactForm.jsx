import React from "react";
import css from './ContactForm.module.css'
import PropTypes from 'prop-types';
// import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectorContacts } from "redux/contactsRedux";
import { toast } from "react-hot-toast";
import { addContact } from "redux/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectorContacts);
 
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const contact = { name, number,};
    form.reset();
    if (contacts.items.find(contact => contact.name === name)) {
      toast.error('Контак вже є')
    } else {
      dispatch(addContact(contact))
      toast.success('Контак додано')
    }
   
  }

        return <form className={css.form} onSubmit={handleSubmit}>
          <label> <span className={css.span}>Name</span><input
            className={css.input}
  type="text"
  name="name"
    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Ivan'
        /></label>
      
          <label> <span className={css.span}> Number</span><input
            className={css.input}
  type="tel"
  name="number"
  pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder='+380-951-232-456'
/></label>
        
        <button className={css.button} type="submit">Add contact</button>
        </form>
}
    
ContactForm.propTypes = {
  onSubmit: PropTypes.func
}

export default ContactForm;