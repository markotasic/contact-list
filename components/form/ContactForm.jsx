import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

import { addNewContact } from '../../api/features/contactSlice';

import { TextInput, CheckboxInput } from './Inputs/inputs';
import ConfirmModal from '../modal/ConfirmModal';

// Validacija za broj telefona koju sam pre koristio jer Yup nema validaciju za telefon
const phoneRegExp =
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$';

//U pocetku projekta sam odlucio da koristim formik zbog lakoce koriscenja, naisao sam na problem kada je bilo potrebno dodati vise broja telefona i nisam imao vremena mogao bih da pronadjem resenja ili da prepravim sve svojim custom inputima
//Image upload sam odlucio da bude obican link do slike umesto file selecta kako ne bih morao da radim sa backendom(nisam siguran da li postoji nacin bez pisanja backenda jer sam to uglavnom radio sa multerom).
const ContactForm = ({ contact, updateContact, deleteContact }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [confirmModal, setConfirmModal] = useState(false);

  const showModal = () => {
    setConfirmModal(!confirmModal);
  };

  return (
    <>
      {confirmModal && (
        <ConfirmModal
          showModal={showModal}
          deleteContact={deleteContact}
          id={contact.id}
        />
      )}
      <Formik
        initialValues={{
          firstName: contact?.firstName || '',
          lastName: contact?.lastName || '',
          email: contact?.email || '',
          profilePhoto: contact?.profilePhoto || '',
          favorite: contact?.favorite || false,
          bookmark: contact?.bookmark || false,
          phoneNumber: contact?.phoneNumber || '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email addresss`')
            .required('Required'),
          phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          values.id = uuidv4();

          if (contact) {
            updateContact(contact.id, values);
          } else {
            dispatch(addNewContact(values));
            router.push('/');
          }

          setSubmitting(false);
        }}
      >
        <Form className='form'>
          <h2>Add a new contact</h2>
          <TextInput label='First Name' name='firstName' type='text' />
          <TextInput label='Last Name' name='lastName' type='text' />
          <TextInput label='Email Address' name='email' type='email' />
          <TextInput label='Profile Photo' name='profilePhoto' type='text' />
          <TextInput label='Phone Number' name='phoneNumber' type='text' />
          <CheckboxInput name='favorite'>Favorite</CheckboxInput>
          <CheckboxInput name='bookmark'>Bookmark</CheckboxInput>

          {contact ? (
            <div className='button-container'>
              <button type='submit' className='btn'>
                Save
              </button>
              <button
                className='btn'
                type='button'
                onClick={() => {
                  router.push(`/`);
                }}
              >
                Cancel
              </button>
              <button
                className='btn'
                type='button'
                onClick={() => setConfirmModal(true)}
              >
                Delete
              </button>
            </div>
          ) : (
            <button type='submit' className='btn'>
              Submit
            </button>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
