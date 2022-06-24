import Link from 'next/link';

import ContactForm from '../../components/form/ContactForm';
import { ArrowIcon } from '../../icons/index';

const AddNewContact = () => {
  return (
    <section id='form-section'>
      <Link href='/'>
        <div className='arrow'>
          <ArrowIcon />
        </div>
      </Link>
      <ContactForm />
    </section>
  );
};
export default AddNewContact;
