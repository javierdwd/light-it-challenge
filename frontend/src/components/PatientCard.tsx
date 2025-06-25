import { Mail, Phone } from 'lucide-react';

import type { User } from '@/types/users';

import { Container, Header, EmailDataItem, PhoneDataItem } from './styles';

import { theme } from '@/lib/theme';

interface Props {
  user: User;
}

export default function PatientCard({ user }: Props) {
  return (
    <Container>
      <Header>
        <h3>{user.name}</h3>
      </Header>
      <EmailDataItem>
        <Mail color={theme.colors.primary} size={18} />
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </EmailDataItem>
      <PhoneDataItem>
        <Phone color={theme.colors.primary} size={18} />
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </PhoneDataItem>
    </Container>
  );
}
