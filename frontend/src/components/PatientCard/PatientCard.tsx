import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import type { User } from '@/types/users';
import { Container, Header, DataContainer, DataItem, Collapsable, UserDocument } from './styles';

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
        <UserDocument>
          <Image src={user.image} alt={user.name} width={600} height={400} />
        </UserDocument>
      </div>

      <Collapsable title="More Info">
        <DataContainer>
          <DataItem>
            <Mail color={theme.colors.primary} size={18} />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </DataItem>
          <DataItem>
            <Phone color={theme.colors.primary} size={18} />
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </DataItem>
        </DataContainer>
      </Collapsable>
    </Container>
  );
}
