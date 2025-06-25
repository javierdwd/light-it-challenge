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
  }
  body {
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.colors.primaryLight},
        ${({ theme }) => theme.colors.primaryLight}66,
        ${({ theme }) => theme.colors.secondaryLight}99
      );
    background-blend-mode: multiply;
    padding: 0 5%;
    min-height: 100vh;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 10%;
    }
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: ${({ theme }) => theme.spacing.md} 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
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
