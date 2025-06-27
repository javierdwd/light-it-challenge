import React from 'react';
import type { Patient } from '@/types/patients';

import PatientCard from '@/components/PatientCard';

import { Container } from './styles';

interface Props {
  initialPatients: Patient[];
}

export default function PatientsGrid({ initialPatients }: Props) {
  return (
    <Container>
      {initialPatients.map((patient) => (
        <div key={patient.id}>
          <PatientCard patient={patient} />
        </div>
      ))}
    </Container>
  );
}
