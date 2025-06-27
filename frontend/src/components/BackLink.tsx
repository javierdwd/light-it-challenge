'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { styled } from 'styled-components';

const StyledBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function BackLink({ href, children }: Props) {
  return (
    <StyledBackLink href={href}>
      <ArrowLeft size={20} />
      {children}
    </StyledBackLink>
  );
}
