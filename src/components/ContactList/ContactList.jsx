import { useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice';
import { selectContacts } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
// import contacts from '../../contacts.json';
selectContacts;
export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  // const savedContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={css.item}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
