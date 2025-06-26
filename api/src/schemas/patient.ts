import { Type } from '@sinclair/typebox';

export const PatientSchema = Type.Object({
  name: Type.String({
    minLength: 1,
    maxLength: 100,
    description: 'Patient full name',
  }),
  email: Type.String({
    // Email's pattern could be improved, I keep it simple for now.
    pattern: '^[a-zA-Z0-9._%+-]+@gmail\\.com$',
    description: 'Patient Gmail address',
  }),
  phone: Type.Object({
    dial_code: Type.String({
      minLength: 1,
      maxLength: 100,
      description: 'Phone dial code',
    }),
    country_code: Type.String({
      minLength: 2,
      maxLength: 2,
      description: 'Phone country code',
    }),
    phone_number: Type.String({
      minLength: 1,
      maxLength: 100,
      description: 'Phone number',
    }),
  }),
  image: Type.Optional(
    Type.String({
      description: 'Patient image filename',
    }),
  ),
});

export type PatientType = typeof PatientSchema.T;
