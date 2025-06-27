'use client';

import { styled, keyframes } from 'styled-components';

interface SpinnerProps {
  color?: string;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.span<{ $color?: string }>`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid ${({ $color, theme }) => $color || theme.colors.gray[300]};
  border-top-color: ${({ $color, theme }) => $color || theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${rotate} 1s linear infinite;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const Spinner = ({ color, ...props }: SpinnerProps) => {
  return <StyledSpinner $color={color} {...props} />;
};

// Mini spinner specifically for buttons
const MiniSpinner = ({ color, ...props }: SpinnerProps) => {
  return <Spinner color={color} {...props} />;
};

export default Spinner;
export { MiniSpinner };
