'use client';

import { styled } from 'styled-components';
import AddPatientButton from './AddPatientButton';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export default function PatientsHeader() {
  return (
    <Header>
      <h1>Patients</h1>
      <AddPatientButton />
    </Header>
  );
}
