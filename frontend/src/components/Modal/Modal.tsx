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
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsRendered(true);
      // Use requestAnimationFrame to ensure DOM is rendered before animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      });
    },
    close: () => {
      // First set isOpen to false to trigger exit animation
      setIsOpen(false);
      // After 500ms delay, unmount the component
      setTimeout(() => {
        setIsRendered(false);
      }, 500);
    },
  }));

  // Early return when modal should not be rendered
  if (!isRendered) {
    return null;
  }

  return (
    <Backdrop className={className} data-testid="modal-backdrop" data-is-open={isOpen}>
      <Container data-is-open={isOpen}>{children}</Container>
    </Backdrop>
  );
});

Modal.displayName = 'Modal';

export default Modal;
