import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ToneSelectorProps {
  selectedTone: string;
  onToneSelect: (tone: string) => void;
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

export const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Tone <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white flex items-center justify-between"
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
                onClick={() => {
                  onToneSelect(tone);
                  setIsOpen(false);
                }}
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
    </div>
  );
};