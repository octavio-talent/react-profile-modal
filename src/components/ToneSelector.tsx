import React from 'react';
import { ChevronDown } from 'lucide-react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldError } from 'react-hook-form';
import { FormData } from '../types';

interface ToneSelectorProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  error?: FieldError;
}

const toneOptions = [
  'Professional',
  'Friendly',
  'Casual',
  'Formal',
  'Enthusiastic',
  'Supportive',
  'Direct',
  'Warm'
];

export const ToneSelector: React.FC<ToneSelectorProps> = ({ register, setValue, watch, error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedTone = watch('tone');

  const handleToneSelect = (tone: string) => {
    setValue('tone', tone);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Tone <span className="text-red-500">*</span>
      </label>
      <input type="hidden" {...register('tone')} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white flex items-center justify-between ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        >
          <span className={selectedTone ? 'text-gray-900' : 'text-gray-400'}>
            {selectedTone || 'Select tone...'}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => handleToneSelect(tone)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  selectedTone === tone ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          {error.message}
        </p>
      )}
    </div>
  );
};