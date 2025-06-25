'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from '@/components/forms/FormInput';
import FormInputPhone, { type OnPhoneChangeValue } from '@/components/forms/FormInputPhone';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

import { FormContainer } from './style';

const patientFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
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

type FormData = z.infer<typeof patientFormSchema>;

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      dialCode: '+1',
      countryCode: '',
      phoneNumber: '',
    },
  });

  const handlePhoneChange = (value: OnPhoneChangeValue) => {
    console.log('PhoneValue', value);
    if (value) {
      setValue('dialCode', value.dialCode);
      setValue('countryCode', value.countryCode);
      setValue('phoneNumber', value.phoneNumber);
    } else {
      setValue('dialCode', '');
      setValue('countryCode', '');
      setValue('phoneNumber', '');
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };
  // console.log('errors', errors);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        placeholder="Enter the patient's full name"
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <FormInput
        placeholder="Enter a valid Gmail email account"
        type="email"
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInputPhone
        error={errors.phoneNumber?.message}
        label="Phone"
        onPhoneChange={handlePhoneChange}
      />

      <PrimaryButton type="submit">Create</PrimaryButton>
    </FormContainer>
  );
}
