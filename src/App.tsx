import DataTable from './components/DataTable/DataTable';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.scss';
import { useState } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { ActionIcon } from '@mantine/core';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    defaultDark ? 'dark' : 'light'
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <ActionIcon
          variant="transparent"
          size={40}
          onClick={() =>
            setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
          }
        >
          {theme === 'dark' ? (
            <MdOutlineLightMode style={{ fontSize: 30, marginBottom: 64 }} />
          ) : (
            <MdOutlineDarkMode style={{ fontSize: 30, marginBottom: 64 }} />
          )}
        </ActionIcon>
        <DataTable />
      </ThemeProvider>
    </div>
  );
}

export default App;
