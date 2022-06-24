import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactService from './contactService';

// Odlucio sam da napisem crud funkcionalnost preko reduxa zvog lakseg povezivanja sa backendom kasnije
// Definitivno bih mogao bolje prilagoditi redux svakom requestu ali bilo bi potrebno vise vremena
const initialState = {
  contacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new contact
export const addNewContact = createAsyncThunk(
  'contacts/create',
  async (contactData, thunkAPI) => {
    try {
      let contacts = [];
      let prevContacts = localStorage.getItem('contacts');
      if (prevContacts) {
        contacts.push(...JSON.parse(prevContacts));
      }
      contacts.push(contactData);
      localStorage.setItem('contacts', JSON.stringify(contacts));

      return contactService.addNewContact();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all contacts
export const getContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      return await contactService.getContacts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get one contact
export const getContact = createAsyncThunk(
  'contactsS/getOne',
  async ({ id, callback }, thunkAPI) => {
    try {
      const contacts = await contactService.getContact(id);

      const contact = contacts.filter((contact) => contact.id === id);

      callback(contact);

      return contact;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Edit contact
export const editContact = createAsyncThunk(
  'contactsS/edit',
  async ({ id, contactData }, thunkAPI) => {
    try {
      const allContacts = JSON.parse(localStorage.getItem('contacts'));

      const filteredContacts = allContacts.filter(
        (contact) => contact.id !== id
      );

      filteredContacts.push(contactData);

      localStorage.setItem('contacts', JSON.stringify(filteredContacts));

      const contacts = await contactService.editContact();

      return contacts;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Change bookmark for contact
export const setBookmark = createAsyncThunk(
  'contacts/setBookmark',
  async (id, thunkAPI) => {
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts'));

      const index = contacts.findIndex((contact) => {
        return contact.id === id;
      });

      if (index !== -1) {
        if (contacts[index].bookmark === true) {
          contacts[index].bookmark = false;
        } else {
          contacts[index].bookmark = true;
        }
      }

      localStorage.setItem('contacts', JSON.stringify(contacts));

      return await contactService.setBookmark();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a contact
export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(filteredContacts));

      return await contactService.deleteContact();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(editContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(setBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
