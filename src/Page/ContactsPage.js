import css from './ContactsPage.module.css'
import ContactForm from 'components/ContactForm/ContactForm'
import { ContactList } from 'components/ContactList/ContactList'
import { Filter } from 'components/Filter/Filter'
import React from 'react'

const ContactsPage = () => {
  return (
    <div className={css.contact}>
          <h1 className={css.phonebook}>Phonebook</h1>
          <ContactForm />
          <Filter/>
          <ContactList />
      </div>
  )
}

export default ContactsPage