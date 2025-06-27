'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import FormInput from '@/components/forms/FormInput';
import FormInputPhone, { type OnPhoneChangeValue } from '@/components/forms/FormInputPhone';
import FileUploader from '@/components/FileUploader';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Modal, { useModal, ModalHeader, ModalFooter } from '@/components/Modal';
import useCreatePatient from '@/queries/useCreatePatient';

import { FormContainer, SuccessMessage, SuccessIcon, ErrorMessage, ErrorIcon } from './style';
import { patientFormSchema, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './validation';

type FormData = z.infer<typeof patientFormSchema>;

export default function PatientForm() {
  const [serverError, setServerError] = useState('');
  const successModal = useModal();
  const errorModal = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      dialCode: '+1',
      countryCode: 'US',
      phoneNumber: '',
      image: undefined,
    },
  });

  const createPatientMutation = useCreatePatient({
    onSuccess: () => {
      successModal.ref.current?.open();

      reset();
    },
    onError: (error: AxiosError<{ message: string; errorCode?: string }>) => {
      if (error.response?.status === 422) {
        if (error.response?.data?.errorCode === 'EMAIL_ALREADY_IN_USE') {
          setError('email', { message: error.response?.data?.message });
          return;
        }

        if (error.response?.data?.errorCode === 'IMAGE_REQUIRED') {
          setError('image', { message: error.response?.data?.message });
          return;
        }

        if (error.response?.data?.errorCode === 'IMAGE_INVALID_TYPE') {
          setError('image', {
            message: error.response?.data?.message,
          });
          return;
        }

        if (error.response?.data?.errorCode === 'PHONE_NUMBER_INVALID') {
          setError('phoneNumber', { message: error.response?.data?.message });
          return;
        }
      }

      setServerError(
        error.response?.data?.message ?? 'An unexpected error occurred. Please try again.',
      );

      errorModal.ref.current?.open();
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
    const patientData = {
      name: data.name,
      email: data.email,
      image: data.image,
      dial_code: data.dialCode,
      country_code: data.countryCode,
      phone_number: data.phoneNumber,
    };

    createPatientMutation.mutate(patientData);
  };

  return (
    <>
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

        <PrimaryButton type="submit" isLoading={createPatientMutation.isPending}>
          Create
        </PrimaryButton>
      </FormContainer>

      {/* Success Modal */}
      <Modal ref={successModal.ref}>
        <SuccessMessage>
          <SuccessIcon>
            <CheckCircle2 size={64} />
          </SuccessIcon>
          Patient created successfully!
        </SuccessMessage>
        <ModalFooter modalRef={successModal.ref} />
      </Modal>

      {/* Error Modal */}
      <Modal ref={errorModal.ref}>
        <ModalHeader title="An unexpected error occurred" />
        <ErrorMessage>
          <ErrorIcon>
            <AlertCircle size={64} />
          </ErrorIcon>
          {serverError}
        </ErrorMessage>
        <ModalFooter modalRef={errorModal.ref} />
      </Modal>
    </>
  );
}
