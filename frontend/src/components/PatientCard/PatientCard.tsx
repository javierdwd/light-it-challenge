import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import type { User } from '@/types/users';

import { Container, Header, EmailDataItem, PhoneDataItem, Collapsable } from './styles';

import { theme } from '@/lib/theme';

interface Props {
  user: User;
}

export default function PatientCard({ user }: Props) {
  return (
    <Container>
      <div>
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
      </div>

      <Collapsable title="Patient ID">
        <Image src={user.image} alt={user.name} width={600} height={400} />
      </Collapsable>
    </Container>
  );
}
