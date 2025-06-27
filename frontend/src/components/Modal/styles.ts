import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  backdrop-filter: blur(0px);
  will-change: opacity, backdrop-filter;

  &[data-is-open='true'] {
    opacity: 1;
    backdrop-filter: blur(2px);
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  opacity: 0;
  transform: scale(0.9) translateY(20px);
  transition:
    opacity 500ms ease-in-out,
    transform 500ms ease-in-out,
    box-shadow 500ms ease-in-out;
  will-change: opacity, transform, box-shadow;

  &[data-is-open='true'] {
    opacity: 1;
    transform: scale(1) translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 95%;
    margin: ${({ theme }) => theme.spacing.sm};
  }
`;

export const HeaderContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const HeaderTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const CloseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray[300]};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    border-color: ${({ theme }) => theme.colors.gray[500]};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }
`;
