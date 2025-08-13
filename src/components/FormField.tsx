import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../types';

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  name,
  register,
  error,
  placeholder,
  required = false
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          {error.message}
        </p>
      )}
    </div>
  );
};