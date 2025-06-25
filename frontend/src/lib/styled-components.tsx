'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

interface StyledComponentsProviderProps {
  children: React.ReactNode;
}
// Reference: https://nextjs.org/docs/app/guides/css-in-js#styled-components
function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}

export function StyledComponentsProvider({ children }: StyledComponentsProviderProps) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
