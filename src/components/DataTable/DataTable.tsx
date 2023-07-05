import './DataTable.scss';
import { StylesProvider } from '@material-ui/core/styles';
import useTableFunction from '../../hooks/useTableFunction';
import persons from '../../sluzba.json';
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
import { DatePickerInput } from '@mantine/dates';
import { TextInput, Flex, Text } from '@mantine/core';

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
    filters,
    dateFilter,
    setFilters,
    camelToHumanReadable,
  } = useTableFunction();

  return (
    <>
      <StylesProvider injectFirst>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(persons[0]).map((field) => {
                  return (
                    <TableCell key={field} width={200}>
                      <Flex direction="column">
                        <TableSortLabel
                          active={orderBy === field}
                          direction={order}
                          onClick={handleOrderChange(field as keyof Person)}
                          sx={{
                            flexDirection: 'row',
                          }}
                        >
                          {camelToHumanReadable(field)}
                        </TableSortLabel>
                        {field === 'dateOfBirth' ? (
                          <DatePickerInput
                            type="range"
                            placeholder="Pick date..."
                            clearable
                            value={dateFilter}
                            onChange={(date) => filterData(field, date)}
                          />
                        ) : (
                          <TextInput
                            value={filters[field as keyof Person]}
                            placeholder="Search..."
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
                      </Flex>
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
                <Flex align="center" justify="center" w="600%" h={200}>
                  <Text weight={400}>No available data</Text>
                </Flex>
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
