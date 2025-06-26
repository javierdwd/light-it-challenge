import { z } from 'zod';

// Define accepted image MIME types (as per PRD requirements)
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg'];

// Maximum file size: 5MB (as per PRD requirements)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const fileSchema = z
  .instanceof(File, { message: 'Please select a valid file' })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Please select a valid JPEG image file',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: 'File size must be less than 5MB',
  });

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
    image: fileSchema, // Mandatory image field
  })
  .refine((data) => data.dialCode && data.countryCode && data.phoneNumber, {
    message: 'Please enter a valid phone number',
    path: ['phoneNumber'],
  });

// Export constants for use in FileUploader
export { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE };
