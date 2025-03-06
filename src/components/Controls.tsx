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
    <div className="flex flex-col space-y-6 sm:space-y-8 w-full max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col space-y-1 sm:space-y-3">
          <label className="text-base sm:text-lg font-bold text-zinc-300">Round Time (min)</label>
          <div className="flex items-center">
            <button
              onClick={() => onRoundTimeChange(Math.max(60, roundTime - 60))}
              className="px-4 py-3 bg-zinc-700 rounded-l-lg text-white text-xl font-bold"
            >
              -
            </button>
            <div className="px-4 py-2 bg-zinc-800/80 border-y-2 border-zinc-600 text-xl sm:text-2xl font-bold text-white text-center min-w-[80px]">
              {Math.floor(roundTime / 60)}
            </div>
            <button
              onClick={() => onRoundTimeChange(Math.min(300, roundTime + 60))}
              className="px-4 py-3 bg-zinc-700 rounded-r-lg text-white text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-1 sm:space-y-3">
          <label className="text-base sm:text-lg font-bold text-zinc-300">Rest Time (sec)</label>
          <div className="flex items-center">
            <button
              onClick={() => onRestTimeChange(Math.max(5, restTime - 5))}
              className="px-4 py-3 bg-zinc-700 rounded-l-lg text-white text-xl font-bold"
            >
              -
            </button>
            <div className="px-4 py-2 bg-zinc-800/80 border-y-2 border-zinc-600 text-xl sm:text-2xl font-bold text-white text-center min-w-[80px]">
              {restTime}
            </div>
            <button
              onClick={() => onRestTimeChange(Math.min(60, restTime + 5))}
              className="px-4 py-3 bg-zinc-700 rounded-r-lg text-white text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:space-y-3">
        <label className="text-base sm:text-lg font-bold text-zinc-300">Number of Rounds</label>
        <div className="flex items-center justify-center">
          <button
            onClick={() => onTotalRoundsChange(Math.max(1, totalRounds - 1))}
            className="px-4 py-3 bg-zinc-700 rounded-l-lg text-white text-xl font-bold"
          >
            -
          </button>
          <div className="px-4 py-2 bg-zinc-800/80 border-y-2 border-zinc-600 text-xl sm:text-2xl font-bold text-white text-center min-w-[80px]">
            {totalRounds}
          </div>
          <button
            onClick={() => onTotalRoundsChange(Math.min(12, totalRounds + 1))}
            className="px-4 py-3 bg-zinc-700 rounded-r-lg text-white text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-6 sm:mt-8">
        <button
          onClick={onReset}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-zinc-700 hover:bg-zinc-600 rounded-lg sm:rounded-xl font-bold text-white text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />
          <span>Reset Timer</span>
        </button>
      </div>
    </div>
  );
};