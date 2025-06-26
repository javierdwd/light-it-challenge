'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from '@/components/forms/FormInput';
import FormInputPhone, { type OnPhoneChangeValue } from '@/components/forms/FormInputPhone';
import FileUploader from '@/components/FileUploader';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

import { FormContainer } from './style';
import { patientFormSchema, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './validation';

type FormData = z.infer<typeof patientFormSchema>;

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      dialCode: '+1',
      countryCode: '',
      phoneNumber: '',
      image: undefined,
    },
  });

  const handlePhoneChange = (value: OnPhoneChangeValue) => {
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
        dialCodeValue={watch('dialCode')}
        phoneNumberValue={watch('phoneNumber')}
        onPhoneChange={handlePhoneChange}
      />

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FileUploader
            name="image"
            onChange={onChange}
            acceptedTypes={ACCEPTED_IMAGE_TYPES}
            maxSize={MAX_FILE_SIZE}
            value={value}
            error={error?.message}
          />
        )}
      />

      <PrimaryButton type="submit">Create</PrimaryButton>
    </FormContainer>
  );
}
