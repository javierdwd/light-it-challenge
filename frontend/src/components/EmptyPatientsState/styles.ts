'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: ${({ theme }) => theme.colors.light};
  border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  min-height: 400px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.6;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  max-width: 400px;
`;

export const ButtonWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;
