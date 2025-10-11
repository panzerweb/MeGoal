import { createTheme } from '@mui/material/styles';

/*
  Figma Color Palette:

  Background: #283b48
  Primary: #222831
  Accent: #00a6c0
  Accent-shade: #096371
*/

const theme = createTheme({
  palette: {
    primary: {
        main: '#283b48',
        contrastText: '#fff',
    },
    secondary: {
        main: '#222831',
        contrastText: '#fff',
    },
    accent: {
        main: '#00a6c0',
        contrastText: '#fff',
    },
    accent_shade: {
        main: '#096371',
        contrastText: '#fff',
    },
  },
});

export default theme;