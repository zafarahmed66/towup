import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    max-width: 100%;
    margin: 0;
    padding: 0;
    text-align: left;
  }
`;
