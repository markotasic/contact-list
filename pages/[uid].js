import { Fragment, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

import {
  getContact,
  editContact,
  deleteContact,
} from '../api/features/contactSlice';
import ContactForm from '../components/form/ContactForm';
import { ArrowIcon } from '../icons/icons';

import placeholderImage from '../public/images/placeholder.png';

const ContactDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [contact, setContact] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const contactId = router.query.uid;

  const getContactCallback = useCallback(
    (contactData) => {
      if (contactId) {
        setContact(...contactData);
      }
    },
    [contactId]
  );

  useEffect(() => {
    if (contactId) {
      dispatch(getContact({ id: contactId, callback: getContactCallback }));
    }
  }, [dispatch, contactId, getContactCallback]);

  const updateContact = (id, contactData) => {
    dispatch(editContact({ id, contactData }));
    router.push(`/`);
  };

  const removeContact = (e) => {
    const id = e.currentTarget.dataset.id;
    dispatch(deleteContact(id));
    router.push(`/`);
  };

  return (
    <section id='contact-detail'>
      <Link href='/'>
        <div className='arrow'>
          <ArrowIcon />
        </div>
      </Link>
      {editMode ? (
        <ContactForm
          contact={contact}
          updateContact={updateContact}
          deleteContact={removeContact}
        />
      ) : (
        <Fragment>
          {contact && (
            <div className='contact-detail'>
              <h2>
                {contact.firstName} {contact.lastName}
              </h2>
              {contact.favorite && <span className='favorite'>⭐</span>}
              {contact.profilePhoto ? (
                <img
                  className='contact_image'
                  src={contact.profilePhoto}
                  alt={contact.firstName}
                />
              ) : (
                <div
                  className='contact_image'
                  //ovo sam morao da uradim zbog nextjs Image componente nije htelo na drugi nacin da se styluje
                  style={{
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    width: '250px',
                    height: '250px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={placeholderImage}
                    alt={contact.firstName}
                    objectFit='cover'
                    layout='fill'
                  />
                </div>
              )}
              <p className='mail'>
                Mail: <strong>{contact.email}</strong>
              </p>

              <p>
                Phone number: <strong>{contact.phoneNumber}</strong>
              </p>
            </div>
          )}
          <button className='btn' onClick={() => setEditMode(true)}>
            Edit
          </button>
        </Fragment>
      )}
    </section>
  );
};
export default ContactDetails;
