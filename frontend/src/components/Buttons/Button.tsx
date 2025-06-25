'use client';

import { styled } from 'styled-components';

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.gray[300]};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[400]};
  }
  &:active {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[200]};
  }
`;

export default Button;
