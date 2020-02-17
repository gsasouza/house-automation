import theme from './theme';

import * as React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

// Call it once in your app. At the root of your app is the best place
toast.configure();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F8;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.palette.secondary};
  }
  .Toastify__toast--error {
    background-color: ${props => props.theme.palette.error};
  }
  .Toastify__toast--info {
    background-color: ${props => props.theme.palette.accent};
  }
  .Toastify__toast--success {
    background-color: ${props => props.theme.palette.success};
  }
`;

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
