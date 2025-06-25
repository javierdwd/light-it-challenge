'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  width: 1600px;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
