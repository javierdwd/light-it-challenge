import type { Patient } from '@/types/patients';
import PatientsHeader from '@/components/PatientsHeader';
import PatientsGrid from './components/PatientsGrid';

import axiosInstance from '@/lib/axios';

export default async function Home() {
  const response = await axiosInstance.get('/patients');

  const patients: Patient[] = response.data.data;

  return (
    <main>
      <PatientsHeader />
      <PatientsGrid initialPatients={patients} />
    </main>
  );
}
