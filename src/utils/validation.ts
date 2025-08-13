import * as yup from 'yup';
import { FormData } from '../types';

export const schema = yup.object<FormData>().shape({
  avatar: yup.mixed<FileList>()
    .required()
    .test('required', 'Avatar file is required', (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test('fileSize', 'File too large (max 20MB)', (value) => {
      if (!value || value.length === 0) return true; // Allow empty if not required
      return value[0].size <= 20 * 1024 * 1024; // 20MB limit
    })
    .test('fileType', 'Unsupported file type (JPEG/PNG/WEBP only)', (value) => {
      if (!value || value.length === 0) return true;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(value[0].type); // Allow specific image types
    }),
  company: yup.string().required('Company is required'),
  companyTitle: yup.string().required('Title is required'),
  name: yup.string().required('Name is required'),
  tone: yup.string().required('Tone is required'),
});