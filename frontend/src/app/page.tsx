import users from '@/constants/users';

import PatientsGrid from './components/PatientsGrid';

export default function Home() {
  return (
    <main>
      <PatientsGrid initialUsers={users} />
    </main>
  );
}
