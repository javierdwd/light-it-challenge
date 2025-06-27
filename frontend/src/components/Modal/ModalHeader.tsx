'use client';

import { type ReactNode } from 'react';
import { HeaderContainer, HeaderTitle } from './styles';

export interface ModalHeaderProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

const ModalHeader = ({ title, children, className }: ModalHeaderProps) => {
  return (
    <HeaderContainer className={className}>
      {title ? <HeaderTitle>{title}</HeaderTitle> : children}
    </HeaderContainer>
  );
};

export default ModalHeader;
