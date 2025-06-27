import { useRef, useEffect, type RefObject } from 'react';
import type { ModalRef } from './Modal';

export interface UseModalOptions {
  defaultOpen?: boolean;
}

export interface UseModalReturn {
  ref: RefObject<ModalRef | null>;
}

const useModal = (options: UseModalOptions = {}): UseModalReturn => {
  const { defaultOpen = false } = options;
  const ref = useRef<ModalRef>(null);

  useEffect(() => {
    if (defaultOpen && ref.current) {
      ref.current.open();
    }
  }, [defaultOpen]);

  return {
    ref,
  };
};

export default useModal;
