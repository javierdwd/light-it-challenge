'use client';

import { styled } from 'styled-components';
import MiniSpinner from '@/components/Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const StyledButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.gray[300]};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[400]};
  }
  &:active {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[200]};
  }

  &[data-is-loading='true'] {
    opacity: 0.7;
    pointer-events: none;
  }
`;

export default function Button({ children, isLoading = false, ...props }: ButtonProps) {
  return (
    <StyledButton {...props} data-is-loading={isLoading}>
      {children}
      {isLoading && <MiniSpinner />}
    </StyledButton>
  );
}
