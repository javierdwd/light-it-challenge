'use client';

import { Users } from 'lucide-react';
import AddPatientButton from '@/components/AddPatientButton';
import { Container, IconWrapper, Title, Description, ButtonWrapper } from './styles';

export default function EmptyPatientsState() {
  return (
    <Container>
      <IconWrapper>
        <Users size={64} />
      </IconWrapper>
      <Title>No patients loaded yet</Title>
      <Description>
        You haven&apos;t added any patients to the system yet. Get started by creating your first
        patient record.
      </Description>
      <ButtonWrapper>
        <AddPatientButton />
      </ButtonWrapper>
    </Container>
  );
}
