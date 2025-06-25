import React from 'react';
import type { User } from '@/types/users';

import UserCard from '@/components/PatientCard';

import { Container } from './styles';

interface Props {
  initialUsers: User[];
}

export default function PatientsGrid({ initialUsers }: Props) {
  return (
    <Container>
      {initialUsers.map((user) => (
        <div key={user.id}>
          <UserCard user={user} />
        </div>
      ))}
    </Container>
  );
}
