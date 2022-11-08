import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell, StyledTableRow } from './ContactsTable.styled';
//
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

function ContactsTable() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

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
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(({ id, name, phone }) => (
            <StyledTableRow key={id}>
              <StyledTableCell scope="row">{id}</StyledTableCell>
              <StyledTableCell align="right">{name}</StyledTableCell>
              <StyledTableCell align="right">{phone}</StyledTableCell>
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

export default ContactsTable;
