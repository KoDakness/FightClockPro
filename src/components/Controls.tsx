import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  startTimer: () => void;
  onPause: () => void;
  onReset: () => void;
  roundTime: number;
  restTime: number;
  totalRounds: number;
  onRoundTimeChange: (time: number) => void;
  onRestTimeChange: (time: number) => void;
  onTotalRoundsChange: (rounds: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  startTimer,
  onPause,
  onReset,
  roundTime,
  restTime,
  totalRounds,
  onRoundTimeChange,
  onRestTimeChange,
  onTotalRoundsChange,
}) => {
  return (
    <div className="flex flex-col space-y-8 w-full max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-3">
          <label className="text-lg font-bold text-zinc-300">Round Time (min)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={Math.floor(roundTime / 60)}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 1;
              onRoundTimeChange(Math.max(1, Math.min(5, value)) * 60);
            }}
            className="px-4 py-3 bg-zinc-800/80 border-2 border-zinc-600 rounded-xl text-2xl font-bold text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label className="text-lg font-bold text-zinc-300">Rest Time (sec)</label>
          <input
            type="number"
            min="5"
            max="60"
            value={restTime}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 5;
              onRestTimeChange(Math.max(5, Math.min(60, value)));
            }}
            className="px-4 py-3 bg-zinc-800/80 border-2 border-zinc-600 rounded-xl text-2xl font-bold text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <label className="text-lg font-bold text-zinc-300">Number of Rounds</label>
        <input
          type="number"
          min="1"
          max="12"
          value={totalRounds}
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value) : 1;
            onTotalRoundsChange(Math.max(1, Math.min(12, value)));
          }}
          className="px-4 py-3 bg-zinc-800/80 border-2 border-zinc-600 rounded-xl text-2xl font-bold text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={onReset}
          className="w-full px-6 py-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold text-white text-lg flex items-center justify-center space-x-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="w-7 h-7" />
          <span>Reset Timer</span>
        </button>
      </div>
    </div>
  );
};