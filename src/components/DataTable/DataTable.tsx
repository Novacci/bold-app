import persons from '../../sluzba.json';
import './DataTable.scss';
import { StylesProvider } from '@material-ui/core/styles';
import useTableFunction from '../../hooks/useTableFunction';
import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { useState } from 'react';

interface Person {
  id: number;
  firstname: string;
  lastName: string;
  dateOfBirth: string;
  function: string;
  experience: number;
}

export default function DataTable() {
  const { page, rowsPerPage, handleChangeRowsPerPage, handleChangePage } =
    useTableFunction();
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<keyof Person>();

  // const handleSort = (property: keyof Person) => (event: any) => {
  //   console.log(property);
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const arraySort = (a: Person, b: Person) => {
  //   if (order === 'asc') {
  //     return a[orderBy] > b[orderBy] ? 1 : -1;
  //   } else {
  //     return a[orderBy] < b[orderBy] ? 1 : -1;
  //   }
  // };

  return (
    <>
      <StylesProvider injectFirst>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="header">
              <TableRow>
                {Object.keys(persons[0]).map((field) => (
                  <TableCell>
                    <TableSortLabel

                    // active={orderBy === ''}
                    // direction={orderBy === '' ? order : 'asc'}
                    // onClick={handleSort(Object.keys(persons[0]))}
                    >
                      {field}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {persons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((person) => (
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component={Paper}
            count={persons.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </StylesProvider>
    </>
  );
}
