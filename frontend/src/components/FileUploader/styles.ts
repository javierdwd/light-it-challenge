import styled, { keyframes } from 'styled-components';
import { Upload } from 'lucide-react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const UploadContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const UploadArea = styled.div<{
  $isDragOver: boolean;
  $hasError: boolean;
  $disabled: boolean;
}>`
  border: 2px dashed
    ${({ theme, $isDragOver, $hasError, $disabled }) => {
      if ($hasError) return theme.colors.danger;
      if ($disabled) return theme.colors.gray[300];
      if ($isDragOver) return theme.colors.primary;
      return theme.colors.gray[400];
    }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme, $isDragOver, $hasError, $disabled }) => {
    if ($hasError) return theme.colors.danger + '05';
    if ($disabled) return theme.colors.gray[100];
    if ($isDragOver) return theme.colors.primaryLight + '20';
    return theme.colors.white;
  }};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    ${({ $disabled, theme }) =>
      !$disabled &&
      `
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primaryLight}10;
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    `}
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xl};
    min-height: 150px;
  }
`;

export const UploadIcon = styled(Upload)`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
  }
`;

export const UploadText = styled.div<{ $disabled: boolean }>`
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray[400] : theme.colors.gray[700])};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;

  strong {
    color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray[400] : theme.colors.primary)};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  small {
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.gray[300] : theme.colors.gray[500]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    display: block;
    margin-top: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const PreviewContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${fadeIn} 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
  }
`;

export const PreviewImage = styled.img`
  max-width: 300px;
  max-height: 200px;
  width: auto;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    max-height: 150px;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  transition: all 0.2s ease-in-out;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.gray[300]};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: ${({ theme }) => theme.spacing.md} auto;
`;
