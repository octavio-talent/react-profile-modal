import React, { useRef } from 'react';
import { Camera, User } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string | null;
  onAvatarSelect: (avatarUrl: string | null) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onAvatarSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onAvatarSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAvatarSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Profile Picture
      </label>
      <div className="flex flex-col items-center">
        <div 
          onClick={handleAvatarClick}
          className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-200 cursor-pointer group overflow-hidden"
        >
          {selectedAvatar ? (
            <>
              <img 
                src={selectedAvatar} 
                alt="Selected avatar" 
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <User className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <Camera className="w-4 h-4 text-gray-400 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            {selectedAvatar ? 'Change Photo' : 'Upload Photo'}
          </button>
          {selectedAvatar && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="ml-3 text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Remove
            </button>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};