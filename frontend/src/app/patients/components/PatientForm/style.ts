'use client';

import styled from 'styled-components';

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  background-color: white;
  padding: ${({ theme }) => theme.spacing.md};
`;
