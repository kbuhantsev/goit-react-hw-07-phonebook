import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: '928fbg1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: '928fbg2', name: 'Hermione Kline', number: '443-89-12' },
    { id: '928fbg3', name: 'Eden Clements', number: '645-17-79' },
    { id: '928fbg4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
    deleteContact: {
      reducer(state, action) {
        return state.filter(contact => contact.id !== action.payload);
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
