'use client';

import FormInput from '@/components/forms/FormInput';

import { Container } from './style';

export default function PatientForm() {
  return (
    <Container>
      <FormInput label="Full Name" />

      <FormInput type="email" label="Email" />

      <FormInput type="tel" label="Phone" />
    </Container>
  );
}
