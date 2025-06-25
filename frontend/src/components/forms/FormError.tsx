import { styled, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  animation:
    ${fadeIn} 0.3s ease-out,
    ${shake} 0.6s ease-in-out 0.3s;
`;

export default function FormError({ children }: { children: React.ReactNode }) {
  return <Error>{children}</Error>;
}
