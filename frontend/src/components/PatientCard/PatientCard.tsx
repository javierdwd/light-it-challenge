import { Mail, Phone } from 'lucide-react';
import type { Patient } from '@/types/patients';
import {
  Container,
  Header,
  DataContainer,
  DataItem,
  Collapsable,
  UserDocument,
  UserDocumentImage,
} from './styles';

import { theme } from '@/lib/theme';

import { getImageUrl } from '@/utils/urls';

interface Props {
  patient: Patient;
}

export default function PatientCard({ patient }: Props) {
  return (
    <Container>
      <div>
        <Header>
          <h3>{patient.name}</h3>
        </Header>
        <UserDocument>
          <UserDocumentImage
            src={getImageUrl(patient.image_path)}
            alt={patient.name}
            width={600}
            height={400}
          />
        </UserDocument>
      </div>

      <Collapsable title="More Info">
        <DataContainer>
          <DataItem>
            <Mail color={theme.colors.primary} size={18} />
            <a href={`mailto:${patient.email}`}>{patient.email}</a>
          </DataItem>
          <DataItem>
            <Phone color={theme.colors.primary} size={18} />
            <a href={`tel:${patient.phone.dial_code}${patient.phone.phone_number}`}>
              {patient.phone.dial_code} {patient.phone.phone_number}
            </a>
          </DataItem>
        </DataContainer>
      </Collapsable>
    </Container>
  );
}
