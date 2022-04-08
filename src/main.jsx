import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    ifgreen: {
      main: '#349A46',
      contrastText: '#fdfdfd'
    },
    ifred: {
      main: '#CA2128',
      contrastText: '#fdfdfd'
    }
  },
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          width: "100%",
          maxWidth: '500px',
          "& div:first-of-type": {
            justifyContent: 'space-between'
          },
          "& div:first-of-type div[role=presentation]": {
            width: '50%',
          },
          "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
            color: `#fdfdfd !important`,
            backgroundColor: `#349A46 !important`,
          },
        },
        viewTransitionContainer: {
          "& > div > div": {
            justifyContent: "space-between !important",
            paddingLeft: (1.25),
            paddingRight: (1.25),
          },
          "& div[role=row]": {
            paddingLeft: (1.25),
            paddingRight: (1.25),
            justifyContent: "space-between !important",
          },
        },
      },
    },
    MuiPickerStaticWrapper: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '500px',
          "& div div ~ div": {
            overflowX: 'hidden',
            // margin: 0,
            width: '100%'
          },
          "& div div ~ div div:first-of-type": {
            // margin: 0,
            paddingLeft: 0,
            paddingRight: 0
          }
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
