'use client';

import { styled } from 'styled-components';
import { type InputHTMLAttributes } from 'react';

import FormLabel from './FormLabel';
import FormError from './FormError';

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  caret-color: ${({ theme }) => theme.colors.primary};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function FormInput({ label, error = '', ...props }: Props) {
  return (
    <div>
      {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
      <Input {...props} />
      {error && <FormError>{error}</FormError>}
    </div>
  );
}
