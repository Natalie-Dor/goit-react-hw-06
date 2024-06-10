import css from './ContactForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
// import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

export default function ContactForm() {
  const dispatch = useDispatch();
  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(
        /^(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2})$/,
        'Phone number must be 10 digits long or in format xxx-xxx-xx-xx'
      )
      .required('Required'),
  });
  const nameFieldId = useId();
  const phoneFieldId = useId();

  // function handleSubmit(values, actions) {
  //   dispatch(addContact(values));
  //   actions.resetForm();
  // }
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const form = event.target;
  //   dispatch(addContact(form.elements.text.value));
  //   form.reset();
  // };
  function handleSubmit(state, action) {
    const newContact = {
      id: crypto.randomUUID(),
      name: state.username,
      number: state.number,
    };
    dispatch(addContact(newContact));
    action.resetForm();
  }
  return (
    <Formik
      initialValues={{ username: '', number: '' }}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formContainer}>
        <label htmlFor={nameFieldId} className={css.label}>
          Name
        </label>
        <Field
          type="text"
          name="username"
          id={nameFieldId}
          className={css.inputField}
        />
        <ErrorMessage
          name="username"
          component="span"
          className={css.errorMessage}
        />

        <label htmlFor={phoneFieldId}>Number</label>
        <Field
          type="text"
          name="number"
          id={phoneFieldId}
          className={css.inputField}
        />
        <ErrorMessage
          name="number"
          component="span"
          className={css.errorMessage}
        />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
