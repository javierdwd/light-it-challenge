import BackLink from '@/components/BackLink';
import PatientForm from '../components/PatientForm';

export default function Home() {
  return (
    <main>
      <h1>Add new patient</h1>
      <BackLink href="/">Back to patients list</BackLink>

      <PatientForm />
    </main>
  );
}
