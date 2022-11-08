import React, { useEffect } from 'react';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import Box from '../Box';
import ContactsTable from 'components/ContactsTable';
import { useTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
//
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';

export default function PhoneBook() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box>
      <Box as={'h1'} mb={'10px'} color={theme.palette.text.primary}>
        Phonebook
      </Box>
      <ContactForm />
      <Box as={'h2'} mb={'0px'} color={theme.palette.text.primary}>
        Contacts
      </Box>
      <Filter />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactsTable />

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </Box>
  );
}
