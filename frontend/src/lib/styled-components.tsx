import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

interface StyledComponentsProviderProps {
  children: React.ReactNode;
}

export function StyledComponentsProvider({ children }: StyledComponentsProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
