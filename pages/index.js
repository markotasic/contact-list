import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { getContacts } from '../api/features/contactSlice';
import Contacts from '../components/contacts/Contacts';

const HomePage = () => {
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const { contacts, isLoading } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (contacts && !isLoading) {
      const sortedContacts = [...contacts].sort(function (x, y) {
        return x.bookmark === y.bookmark ? 0 : x.bookmark ? -1 : 1;
      });

      const searchedContacts = sortedContacts.filter((contact) => {
        const fullName = contact.firstName + contact.lastName;
        return fullName
          .toLowerCase()
          .split(' ')
          .join('')
          .includes(search.toLocaleLowerCase().split(' ').join(''));
      });
      setSearchedContacts(searchedContacts);
    }
  }, [contacts, search, isLoading]);

  const favoriteContacts = searchedContacts.filter(
    (contact) => contact.favorite
  );

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <main>
      <input
        type='text'
        placeholder='search contacts'
        className='search-bar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link href='/newContact'>
        <button className='btn btn-add'>Add a new contact</button>
      </Link>
      <ul className='contacts'>
        <li className='contacts_all'>
          <h2>Contacts</h2>
          {searchedContacts.length > 0 ? (
            <Contacts contacts={searchedContacts} />
          ) : (
            <p>No contacts maby add some!</p>
          )}
        </li>
        <li className='contacts_favorites'>
          <h2>Favorites</h2>
          {favoriteContacts.length > 0 ? (
            <Contacts contacts={favoriteContacts} />
          ) : (
            <p>No favorite contacts maby add some!</p>
          )}
        </li>
      </ul>
    </main>
  );
};

export default HomePage;
