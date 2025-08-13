import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from './Modal';
import { AvatarSelector } from './AvatarSelector';
import { FormField } from './FormField';
import { ToneSelector } from './ToneSelector';
import { Agent, FormData } from '../types';
import { schema } from '../utils/validation';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgent: (agent: Omit<Agent, 'id'>) => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose, onAddAgent }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      companyTitle: '',
      tone: '',
      avatar: new DataTransfer().files // Empty FileList
    }
  });

  const onSubmit = (data: FormData) => {
    // Convert FileList to base64 for storage
    const file = data.avatar[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string;
        onAddAgent({
          name: data.name,
          company: data.company,
          companyTitle: data.companyTitle,
          tone: data.tone,
          avatar: avatarUrl
        });
        handleClose();
      };
      reader.readAsDataURL(file);
    } else {
      onAddAgent({
        name: data.name,
        company: data.company,
        companyTitle: data.companyTitle,
        tone: data.tone,
        avatar: null
      });
      handleClose();
    }
  };

  const handleClose = () => {
    reset({
      name: '',
      company: '',
      companyTitle: '',
      tone: '',
      avatar: new DataTransfer().files
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Agent">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AvatarSelector
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.avatar}
        />

        <FormField
          label="Name"
          name="name"
          register={register}
          error={errors.name}
          placeholder="Enter agent name"
          required
        />

        <FormField
          label="Company"
          name="company"
          register={register}
          error={errors.company}
          placeholder="Enter company name"
          required
        />

        <FormField
          label="Company Title"
          name="companyTitle"
          register={register}
          error={errors.companyTitle}
          placeholder="Enter job title"
          required
        />

        <ToneSelector
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.tone}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
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
            Add Agent
          </button>
        </div>
      </form>
    </Modal>
  );
};