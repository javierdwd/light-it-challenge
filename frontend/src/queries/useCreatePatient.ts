import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export type CreatePatientRequest = {
  name: string;
  email: string;
  image: File;
  dial_code: string;
  country_code: string;
  phone_number: string;
};

const createPatient = async (data: CreatePatientRequest) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('image', data.image);
  formData.append('dial_code', data.dial_code);
  formData.append('country_code', data.country_code);
  formData.append('phone_number', data.phone_number);

  const response = await axiosInstance.post('/patients', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const useCreatePatient = (options = {}) => {
  return useMutation({
    mutationFn: createPatient,
    ...options,
  });
};

export default useCreatePatient;
