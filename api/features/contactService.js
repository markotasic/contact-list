//Svu logiku sam napisao u redux-thunku da bi servisi bili cisti

// Create a new contact
const addNewContact = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

// Get all contacts
const getContacts = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

// Get a single contact
const getContact = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

// Edit a contact
const editContact = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

const setBookmark = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

// Delete a contact
const deleteContact = () => {
  const response = JSON.parse(localStorage.getItem('contacts'));

  return response;
};

const contactService = {
  addNewContact,
  getContacts,
  getContact,
  editContact,
  setBookmark,
  deleteContact,
};

export default contactService;
