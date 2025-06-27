'use client';
import Image from 'next/image';
import styled from 'styled-components';

import BaseCollapsable from '../Collapsable';

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.header`
  h3 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const UserDocument = styled.div`
  text-align: center;
`;
export const UserDocumentImage = styled(Image)`
  object-fit: cover;
  aspect-ratio: 600/400;
`;

export const DataContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DataItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    word-break: break-all;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Collapsable = styled(BaseCollapsable)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
