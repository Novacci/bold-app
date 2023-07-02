import persons from '../../sluzba.json';
import './DataTable.scss';
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

interface Person {
  id: number;
  firstname: string;
  lastName: string;
  dateOfBirth: string;
  function: string;
  experience: number;
}

export default function DataTable() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(persons[0]).map((field) => (
                <TableCell>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow>
                <TableCell>{person.id}</TableCell>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.dateOfBirth}</TableCell>
                <TableCell>{person.function}</TableCell>
                <TableCell>{person.experience}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
