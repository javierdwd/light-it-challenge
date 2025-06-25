'use client';

import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: block;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const ActionableTitle = styled.button`
  border: 0;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  &[aria-expanded='true'] + ${Content} {
    max-height: 100vh;
    height: min-content;
  }
`;
