import { useState } from 'react';
import { Person } from '../components/DataTable/DataTable';
import persons from '../sluzba.json';

export default function useTableFunction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Person>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [tableData, setTableData] = useState<Person[]>(persons);

  const handleOrderChange = (property: keyof Person) => (event: any) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const arraySort = (a: Person, b: Person) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const filterData = (field: keyof Person, value: any) => {
    setTableData((prev) => {
      //TODO: date filter
      if (field === 'dateOfBirth') {
        return persons;
      }

      return prev.filter((data) =>
        data[field]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase() as string)
      );
    });
  };

  const resetFilters = () => setTableData(persons);

  return {
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    handleOrderChange,
    arraySort,
    orderBy,
    order,
    tableData,
    filterData,
    resetFilters,
  };
}
