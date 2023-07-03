import { useState } from 'react';

export default function useTableFunction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return {
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  };
}
