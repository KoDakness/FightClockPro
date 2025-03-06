import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface SoundSettingsProps {
  onSoundChange: (file: File) => void;
  onResetSound: () => void;
}

export const SoundSettings: React.FC<SoundSettingsProps> = ({ onSoundChange, onResetSound }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-full transition-colors"
        title="Custom Bell Sound"
      >
        <Bell className="w-6 h-6 text-red-500" />
        <span className="text-xs text-zinc-400 font-medium">Custom Bell</span>
      </button>
      
      {isExpanded && (
        <div className="absolute bottom-full mb-2 right-0 bg-zinc-900 rounded-lg p-4 shadow-lg border border-zinc-700 min-w-[250px]">
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium text-zinc-400">Custom Bell Sound</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onSoundChange(file);
                  setIsExpanded(false);
                }
              }}
              className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-red-500 file:text-white hover:file:bg-red-600
                cursor-pointer w-full"
            />
            <button
              onClick={() => {
                onResetSound();
                setIsExpanded(false);
              }}
              className="w-full px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}