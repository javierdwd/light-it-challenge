'use client';

import styled from 'styled-components';

export const FormContainer = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: 0 auto;
  display: flex;
  margin-top: 4rem;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  background-color: white;
  padding: ${({ theme }) => theme.spacing.md};
`;
