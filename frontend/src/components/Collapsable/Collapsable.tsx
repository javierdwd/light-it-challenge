'use client';

import { useState, type ReactNode } from 'react';
import { Container, ActionableTitle, Content, ArrowIcon } from './styles';

interface Props {
  children: ReactNode;
  className?: string;
  title: string;
  defaultOpen?: boolean;
}

export default function Collapsable({ children, className, title, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Container className={className}>
      <ActionableTitle aria-expanded={isOpen} onClick={handleToggle}>
        {title}
        <ArrowIcon size={21} />
      </ActionableTitle>

      <Content>{children}</Content>
    </Container>
  );
}
