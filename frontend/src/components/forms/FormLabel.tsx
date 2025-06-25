'use client';

import { type LabelHTMLAttributes } from 'react';
import { styled } from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function FormLabel({ required, ...props }: Props) {
  return (
    <Label {...props}>
      {props.children} {required && <span>*</span>}
    </Label>
  );
}
