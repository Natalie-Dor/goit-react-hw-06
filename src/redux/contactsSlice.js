// const contactsInitialState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
import { createSlice, nanoid } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    prepare(text) {
      return {
        payload: {
          text,
          id: nanoid(),
          completed: false,
        },
      };
    },
    deleteContact: (state, action) => {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});
export const selectContacts = state => state.contacts.items;
export const { addContact, deleteContact } = slice.actions;
export default slice.reducer;