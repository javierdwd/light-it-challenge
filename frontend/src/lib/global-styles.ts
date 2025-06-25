import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
  
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.primaryUltraLight};
  }

  img {
    display: inline-block;
    vertical-align: middle;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  

  input, textarea, select {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
