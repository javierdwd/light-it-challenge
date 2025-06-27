'use client';

import { forwardRef, useImperativeHandle, useState, type ReactNode } from 'react';
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
  const [isRendered, setIsRendered] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsRendered(true);
    },
    close: () => {
      // Will be implemented in next objective
      console.log('Modal close method called');
    },
  }));

  // Early return when modal should not be rendered
  if (!isRendered) {
    return null;
  }

  return (
    <Backdrop className={className} data-testid="modal-backdrop">
      <Container>{children}</Container>
    </Backdrop>
  );
});

Modal.displayName = 'Modal';

export default Modal;
