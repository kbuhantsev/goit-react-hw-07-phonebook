import React, { useMemo } from 'react';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import Box from '../Box';
import ContactsTable from 'components/ContactsTable';
import { useTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
//
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';

export default function PhoneBook() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const theme = useTheme();

  const filteredContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <>
      <Box as={'h1'} mb={'10px'} color={theme.palette.text.primary}>
        Phonebook
      </Box>
      <ContactForm />
      <Box as={'h2'} mb={'0px'} color={theme.palette.text.primary}>
        Contacts
      </Box>
      <Filter />
      {filteredContacts && <ContactsTable contacts={filteredContacts} />}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}
