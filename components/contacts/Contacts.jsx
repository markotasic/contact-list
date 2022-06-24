import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

import { setBookmark } from '../../api/features/contactSlice';

import placeholderImage from '../../public/images/placeholder.png';
import { BookmarkIcon } from '../../icons/icons';

const Contacts = ({ contacts }) => {
  const dispatch = useDispatch();

  const bookmark = (e) => {
    const id = e.currentTarget.dataset.id;
    dispatch(setBookmark(id));
  };

  // Nemam puno iskustva sa nextjs-om pravio mi je problem njihova Image componenta pa sam morao ovako da ubacim sliku
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id} className='contact'>
          <Link href={`/${contact.id}`}>
            <div className='contact_overview'>
              {contact.profilePhoto ? (
                <img
                  className='contact_image'
                  src={contact.profilePhoto}
                  alt={contact.firstName}
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  className='contact_image'
                  src={placeholderImage}
                  alt={contact.firstName}
                  width={50}
                  height={50}
                />
              )}
              <p>
                {contact.firstName} {contact.lastName}
              </p>
            </div>
          </Link>
          <div
            className={`bookmark ${contact.bookmark && 'bookmarked'}`}
            onClick={bookmark}
            data-id={contact.id}
          >
            <BookmarkIcon />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default Contacts;
