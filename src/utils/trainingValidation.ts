import * as yup from 'yup';
import { TrainingFormData } from '../types';

export const trainingSchema = yup.object<TrainingFormData>().shape({
  title: yup.string().required('Title is required'),
  url: yup.boolean(),
  attachments: yup.boolean(),
  text: yup.boolean(),
  mainDomains: yup.array().of(yup.string()),
  findRelatedLinks: yup.boolean(),
  attachmentFiles: yup.mixed<FileList>()
    .test('conditionalRequired', 'At least one file is required when attachments is selected', function(value) {
      const { attachments } = this.parent;
      if (attachments && (!value || value.length === 0)) {
        return false;
      }
      return true;
    })
    .test('fileSize', 'File too large (max 100MB)', (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every(file => file.size <= 100 * 1024 * 1024);
    })
    .test('fileType', 'Unsupported file type (PDF, MP3, MP4 only)', (value) => {
      if (!value || value.length === 0) return true;
      const allowedTypes = ['application/pdf', 'audio/mpeg', 'audio/mp3', 'video/mp4'];
      return Array.from(value).every(file => allowedTypes.includes(file.type));
    }),
  textContent: yup.string()
    .test('conditionalRequired', 'Text content is required when text option is selected', function(value) {
      const { text } = this.parent;
      if (text && (!value || value.trim() === '')) {
        return false;
      }
      return true;
    })
    .max(2000, 'Text content must be 2000 characters or less'),
  addToPublic: yup.boolean(),
  addToPrivate: yup.boolean(),
})
.test('dataOptionsRequired', 'At least one data option must be selected', function(values) {
  const { url, attachments, text } = values;
  if (!url && !attachments && !text) {
    return this.createError({
      path: 'dataOptions',
      message: 'Select at least 1 data option'
    });
  }
  return true;
})
.test('mainDomainsRequired', 'At least one main domain is required when URL is selected', function(values) {
  const { url, mainDomains } = values;
  if (url && (!mainDomains || mainDomains.length === 0 || mainDomains.every(domain => !domain.trim()))) {
    return this.createError({
      path: 'mainDomains',
      message: 'Main domain is required when URL option is selected'
    });
  }
  return true;
});