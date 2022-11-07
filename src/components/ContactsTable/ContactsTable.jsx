import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

import { StyledTableCell, StyledTableRow } from './ContactsTable.styled';

//
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

function ContactsTable({ contacts }) {
  const dispatch = useDispatch();

  const onDelete = ({ id }) => {
    dispatch(deleteContact(id));
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '900px' }}>
      <Table aria-label="contacts table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Contact ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Number</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(({ id, name, number }) => (
            <StyledTableRow key={id}>
              <StyledTableCell scope="row">{id}</StyledTableCell>
              <StyledTableCell align="right">{name}</StyledTableCell>
              <StyledTableCell align="right">{number}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete({ id })}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ContactsTable.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default ContactsTable;
