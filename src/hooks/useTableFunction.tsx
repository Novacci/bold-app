import { useState } from 'react';
import { Person } from '../components/DataTable/DataTable';
import persons from '../sluzba.json';
import moment from 'moment';

export default function useTableFunction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Person>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [tableData, setTableData] = useState<Person[]>(persons);

  const handleOrderChange = (property: keyof Person) => (event: any) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const arraySort = (a: Person, b: Person) => {
    let firstElement = a[orderBy];
    let secondElement = b[orderBy];
    if (orderBy === 'dateOfBirth') {
      firstElement = moment(firstElement.toString(), 'D.M.YYYY hh:mm').unix();
      secondElement = moment(secondElement.toString(), 'D.M.YYYY hh:mm').unix();
    }
    if (order === 'asc') {
      return firstElement > secondElement ? 1 : -1;
    } else {
      return firstElement < secondElement ? 1 : -1;
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
    if (page !== 0) {
      setPage(0);
    }
    setTableData((prev) => {
      if (field === 'dateOfBirth') {
        if (value[0] !== null && value[1] !== null) {
          let firstTimestamp = moment(value[0].toString()).unix();
          let secondTimestamp = moment(value[1].toString()).unix();
          return prev.filter((data) => {
            let timestamp = moment(
              data[field].toString(),
              'D.M.YYYY hh:mm'
            ).unix();
            return timestamp > firstTimestamp && timestamp < secondTimestamp;
          });
        }
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
