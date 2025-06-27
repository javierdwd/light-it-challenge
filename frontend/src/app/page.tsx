import type { Patient } from '@/types/patients';
import PatientsHeader from '@/components/PatientsHeader';
import PatientsGrid from './components/PatientsGrid';
import EmptyPatientsState from '@/components/EmptyPatientsState';

import axiosInstance from '@/lib/axios';

export default async function Home() {
  const response = await axiosInstance.get('/patients');

  const patients: Patient[] = response.data.data;

  return (
    <main>
      <PatientsHeader />
      {patients.length === 0 ? <EmptyPatientsState /> : <PatientsGrid initialPatients={patients} />}
    </main>
  );
}
