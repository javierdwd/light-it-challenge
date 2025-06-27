'use client';

import { type ReactNode, type RefObject } from 'react';
import { FooterContainer, CloseButton } from './styles';
import type { ModalRef } from './Modal';

export interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
  modalRef?: RefObject<ModalRef | null>;
}

const ModalFooter = ({ children, className, modalRef }: ModalFooterProps) => {
  const handleClose = () => {
    modalRef?.current?.close();
  };

  return (
    <FooterContainer className={className}>
      {children || <CloseButton onClick={handleClose}>Close</CloseButton>}
    </FooterContainer>
  );
};

export default ModalFooter;
