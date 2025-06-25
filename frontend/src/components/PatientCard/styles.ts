'use client';

import BaseCollapsable from '../Collapsable';

import styled from 'styled-components';

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.header`
  h3 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const DataItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};

  a {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const EmailDataItem = styled(DataItem)`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PhoneDataItem = styled(DataItem)``;

export const ImageContainer = styled.details`
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Collapsable = styled(BaseCollapsable)`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;
