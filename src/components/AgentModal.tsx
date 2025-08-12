import React, { useState } from 'react';
import { Modal } from './Modal';
import { AvatarSelector } from './AvatarSelector';
import { FormField } from './FormField';
import { ToneSelector } from './ToneSelector';
import { Agent } from '../types';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgent: (agent: Omit<Agent, 'id'>) => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose, onAddAgent }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    companyTitle: '',
    tone: '',
    avatar: null as string | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.companyTitle || !formData.tone) {
      return;
    }

    onAddAgent(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      company: '',
      companyTitle: '',
      tone: '',
      avatar: null
    });
    onClose();
  };

  const isFormValid = formData.name && formData.company && formData.companyTitle && formData.tone;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Agent">
      <form onSubmit={handleSubmit} className="space-y-6">
        <AvatarSelector
          selectedAvatar={formData.avatar}
          onAvatarSelect={(avatarUrl) => setFormData({ ...formData, avatar: avatarUrl })}
        />

        <FormField
          label="Name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          placeholder="Enter agent name"
          required
        />

        <FormField
          label="Company"
          value={formData.company}
          onChange={(value) => setFormData({ ...formData, company: value })}
          placeholder="Enter company name"
          required
        />

        <FormField
          label="Company Title"
          value={formData.companyTitle}
          onChange={(value) => setFormData({ ...formData, companyTitle: value })}
          placeholder="Enter job title"
          required
        />

        <ToneSelector
          selectedTone={formData.tone}
          onToneSelect={(tone) => setFormData({ ...formData, tone })}
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
            disabled={!isFormValid}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isFormValid
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