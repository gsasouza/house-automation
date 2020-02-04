import theme from './theme';

import * as React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F8;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.palette.secondary};
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
