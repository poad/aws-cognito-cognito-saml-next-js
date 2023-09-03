'use client';

import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { Roboto } from 'next/font/google';

// A theme with custom primary and secondary color.
// It's optional.

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const options = {
  palette: {
    primary: {
      main: '#2d2d2d',
      text: '#fff',
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  },
};

const theme = createTheme(options);
export type Theme = typeof theme;
export default theme;
