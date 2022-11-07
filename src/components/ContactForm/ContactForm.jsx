import React from 'react';
import { customAlphabet } from 'nanoid';
import * as Yup from 'yup';
import { ButtonStyled, FormStyled } from './ContactForm.styled';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
//
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ToastContainer, toast } from 'react-toastify';

//
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from 'redux/contactsSlice';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameReExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = Yup.object({
  name: Yup.string()
    .min(3, 'Minimum 3 letters!')
    .matches(nameReExp, 'Name is not valid!')
    .required('This field is required!'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid!')
    .max(13, 'Maximum 13 numbers!')
    .required('This field is required!'),
}).required();

const generateId = () => {
  const nanoid = customAlphabet('1234567890abcdefg', 10);
  return nanoid(7);
};

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
    },
    resolver: yupResolver(schema),
  });

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onFormSubmit = data => {
    const { name, number } = data;
    const id = generateId();
    const contact = {
      id,
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      toast.warning(`${name} is already in contacts`, {});
      return;
    }
    dispatch(addContact(contact));
  };

  const onFormError = error => {
    toast.error(error);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <FormStyled onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              size="small"
              error={errors.name && true}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Number"
              variant="outlined"
              size="small"
              error={errors.number && true}
              helperText={errors.number?.message}
            />
          )}
        />

        <ButtonStyled type="submit" variant="outlined" startIcon={<AddIcon />}>
          Add contact
        </ButtonStyled>
      </FormStyled>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
