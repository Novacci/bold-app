import './DataTable.scss';
import { StylesProvider } from '@material-ui/core/styles';
import useTableFunction from '../../hooks/useTableFunction';
import persons from '../../sluzba.json';

// import dayjs, { Dayjs } from 'dayjs';
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
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import moment from 'moment';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  function: string;
  experience: number;
}
export default function DataTable() {
  const {
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    handleOrderChange,
    order,
    orderBy,
    arraySort,
    tableData,
    filterData,
    resetFilters,
  } = useTableFunction();

  const [filters, setFilters] = useState({
    id: '',
    firstName: '',
    lastName: '',
    function: '',
    experience: '',
  });

  const [dateFilter, setDateFilter] = useState<DatesRangeValue>();

  return (
    <>
      <StylesProvider injectFirst>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="header">
              <TableRow>
                {Object.keys(persons[0]).map((field) => {
                  return (
                    <TableCell key={field}>
                      <TableSortLabel
                        active={orderBy === field}
                        direction={order}
                        onClick={handleOrderChange(field as keyof Person)}
                      >
                        {field}
                      </TableSortLabel>
                      {field === 'dateOfBirth' ? (
                        <DatePickerInput
                          type="range"
                          valueFormat="YYYY MMM DD"
                          placeholder="Pick date"
                          mx="auto"
                          maw={400}
                          value={dateFilter}
                          onChange={(date) => filterData(field, date)}
                        />
                      ) : (
                        <TextField
                          size="small"
                          value={filters[field as keyof Person]}
                          onChange={(e) => {
                            setFilters((prev) => {
                              return {
                                ...prev,
                                [field]: e.target.value,
                              };
                            });
                            filterData(field as keyof Person, e.target.value);
                            if (e.target.value === '') {
                              resetFilters();
                            }
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 ? (
                tableData
                  .sort(arraySort)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((person) => (
                    <TableRow key={person.id}>
                      {Object.values(person).map((item, index) => (
                        <TableCell key={`${item}-${index}`}>{item}</TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component={Paper}
            count={tableData.length}
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
