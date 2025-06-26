import { z } from 'zod';

export const patientFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email')
      .refine((email) => email.endsWith('@gmail.com'), {
        message: 'Email must be a valid Gmail account (@gmail.com)',
      }),
    dialCode: z.string().min(1, 'Dial code is required'),
    countryCode: z.string().min(1, 'Country code is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
  })
  .refine((data) => data.dialCode && data.countryCode && data.phoneNumber, {
    message: 'Please enter a valid phone number',
    path: ['phoneNumber'],
  });
