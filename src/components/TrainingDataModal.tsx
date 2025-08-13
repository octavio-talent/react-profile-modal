import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X, Upload, Plus, Info, HelpCircle } from 'lucide-react';
import { Modal } from './Modal';
import { TrainingFormData, TrainingData } from '../types';
import { trainingSchema } from '../utils/trainingValidation';

interface TrainingDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrainingData: (data: Omit<TrainingData, 'id'>) => void;
}

export const TrainingDataModal: React.FC<TrainingDataModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddTrainingData 
}) => {
  const [mainDomains, setMainDomains] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<TrainingFormData>({
    resolver: yupResolver(trainingSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      url: false,
      attachments: false,
      text: false,
      mainDomains: [''],
      findRelatedLinks: false,
      attachmentFiles: new DataTransfer().files,
      textContent: '',
      addToPublic: false,
      addToPrivate: false,
    }
  });

  const watchedValues = watch();
  const { url, attachments, text } = watchedValues;

  const onSubmit = (data: TrainingFormData) => {
    const trainingData: Omit<TrainingData, 'id'> = {
      title: data.title,
      dataOptions: {
        url: data.url,
        attachments: data.attachments,
        text: data.text,
      },
      mainDomains: data.mainDomains.filter(domain => domain.trim() !== ''),
      findRelatedLinks: data.findRelatedLinks,
      attachments: data.attachmentFiles.length > 0 ? data.attachmentFiles : null,
      text: data.textContent,
      privacySettings: {
        addToPublic: data.addToPublic,
        addToPrivate: data.addToPrivate,
      }
    };
    
    onAddTrainingData(trainingData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setMainDomains(['']);
    onClose();
  };

  const addMainDomain = () => {
    const newDomains = [...mainDomains, ''];
    setMainDomains(newDomains);
    setValue('mainDomains', newDomains);
  };

  const updateMainDomain = (index: number, value: string) => {
    const newDomains = [...mainDomains];
    newDomains[index] = value;
    setMainDomains(newDomains);
    setValue('mainDomains', newDomains);
  };

  const removeMainDomain = (index: number) => {
    if (mainDomains.length > 1) {
      const newDomains = mainDomains.filter((_, i) => i !== index);
      setMainDomains(newDomains);
      setValue('mainDomains', newDomains);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Training data">
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Input data for your persona to learn from. The title and at least one data option 
          is required. When new training data is added that contradicts old training data, 
          we preference the new one so that it replaces the old one
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder="Give your data a title"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Data Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Data options
            </label>
            <p className="text-sm text-gray-600 mb-4">Select at least 1 data option</p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('url')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900 font-medium">URL</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('attachments')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900 font-medium">Attachments</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('text')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900 font-medium">Text</span>
              </label>
            </div>
            
            {errors.dataOptions && (
              <p className="mt-2 text-sm text-red-600">{errors.dataOptions.message}</p>
            )}
          </div>

          {/* Main Domain URL - Only show if URL is selected */}
          {url && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-semibold text-gray-900">
                  Main domain (URL)
                </label>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {mainDomains.map((domain, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={domain}
                      onChange={(e) => updateMainDomain(index, e.target.value)}
                      placeholder="Starting with https:// or http://"
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                        errors.mainDomains ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {mainDomains.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMainDomain(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('findRelatedLinks')}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-900">Find related links on this site</span>
                </label>
                
                <button
                  type="button"
                  onClick={addMainDomain}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Add another main domain +
                </button>
              </div>
              
              {errors.mainDomains && (
                <p className="mt-2 text-sm text-red-600">{errors.mainDomains.message}</p>
              )}
            </div>
          )}

          {/* Attachments - Only show if Attachments is selected */}
          {attachments && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Attachments (Supports pdf, mp3, and mp4)
              </label>
              
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                errors.attachmentFiles ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
              }`}>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Upload a file</span> that is less than 100MB
                  </p>
                  <input
                    type="file"
                    {...register('attachmentFiles')}
                    multiple
                    accept=".pdf,.mp3,.mp4"
                    className="hidden"
                    id="attachment-upload"
                  />
                  <label
                    htmlFor="attachment-upload"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                  >
                    Choose Files
                  </label>
                </div>
              </div>
              
              {errors.attachmentFiles && (
                <p className="mt-2 text-sm text-red-600">{errors.attachmentFiles.message}</p>
              )}
            </div>
          )}

          {/* Text - Only show if Text is selected */}
          {text && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Text
              </label>
              <textarea
                {...register('textContent')}
                placeholder="Write any information your persona needs to know"
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none ${errors.textContent ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                maxLength={2000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                {(watchedValues.textContent || '').length}/2000
              </div>
            </div>
              // {errors.textContent && (
              //   <p className="mt-2 text-sm text-red-600">{errors.textContent.message}</p>
              // )}
          )}
          
          {/* Privacy Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <label className="text-sm font-semibold text-gray-900">
                Privacy Settings
              </label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('addToPublic')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900">Add to public knowledgebase</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('addToPrivate')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900">Add to private knowledgebase</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};