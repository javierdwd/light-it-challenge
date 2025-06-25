import users from '@/constants/users';

import PatientsGrid from './components/PatientsGrid';

export default function Home() {
  return (
    <main>
      <h1>Patients</h1>

      <PatientsGrid initialUsers={users} />
    </main>
  );
}
