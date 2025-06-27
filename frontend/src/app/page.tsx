import users from '@/constants/users';
import PatientsHeader from '@/components/PatientsHeader';

import PatientsGrid from './components/PatientsGrid';

export default function Home() {
  return (
    <main>
      <PatientsHeader />

      <PatientsGrid initialUsers={users} />
    </main>
  );
}
