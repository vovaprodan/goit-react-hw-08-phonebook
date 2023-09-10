import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContactId, fetchTasks } from "./operations";

const initialState = {
 contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState,
    reducers: {
      addFilter(state, action) {
             state.filter = action.payload;
      },
  },
      extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      }).addCase(fetchTasks.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      }).addCase(fetchTasks.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
        builder
          .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
      })
        builder
          .addCase(deleteContactId.fulfilled, (state, action) => {
            state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload.id);
  
      })
   
  },

});
export const {addFilter} =
  contactsSlice.actions;
export const selectorFilter = state => state.contacts.filter;
export const selectorContacts = state => state.contacts.contacts;
export const selectorError = state => state.contacts.contacts.error;
export const selectorIsLoading = state => state.contacts.contacts.isLoading;

export const contactsReducer = contactsSlice.reducer;