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

  &[data-is-open='true'] {
    opacity: 1;
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
  transform: scale(0.9);
  transition:
    opacity 500ms ease-in-out,
    transform 500ms ease-in-out;

  &[data-is-open='true'] {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 95%;
    margin: ${({ theme }) => theme.spacing.sm};
  }
`;
