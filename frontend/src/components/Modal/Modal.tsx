'use client';

import { forwardRef, useImperativeHandle, type ReactNode } from 'react';
import { Backdrop, Container } from './styles';

export interface ModalProps {
  children: ReactNode;
  className?: string;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(({ children, className }, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => {
      // Will be implemented in next objective
      console.log('Modal open method called');
    },
    close: () => {
      // Will be implemented in next objective
      console.log('Modal close method called');
    },
  }));

  // For now, just render children without state management
  // This will be enhanced in the next objectives
  return (
    <Backdrop className={className}>
      <Container>{children}</Container>
    </Backdrop>
  );
});

Modal.displayName = 'Modal';

export default Modal;
