import React from 'react';
import { Bell } from 'lucide-react';

interface TimerProps {
  currentRound: number;
  totalRounds: number;
  isRunning: boolean;
  timeLeft: number;
  isResting: boolean;
  restTimeLeft: number;
  initialCountdown: number | null;
  onManualBell: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  currentRound,
  totalRounds,
  isRunning,
  timeLeft,
  isResting,
  restTimeLeft,
  initialCountdown,
  onManualBell: startTimer,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4 bg-zinc-900 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
      <div className="text-3xl sm:text-4xl font-bold text-red-500">
        Round {currentRound} of {totalRounds}
      </div>
      <div className="text-7xl sm:text-9xl font-bold font-mono tracking-wider">
        {initialCountdown !== null ? (
          <span className="text-white animate-pulse">{initialCountdown}</span>
        ) : isResting ? (
          <span className="text-red-500 animate-pulse">{restTimeLeft}</span>
        ) : (
          <span className="text-white">{formatTime(timeLeft)}</span>
        )}
      </div>
      <div className="text-xl sm:text-2xl font-semibold text-zinc-400">
        {initialCountdown !== null ? (
          'ROUND STARTING'
        ) : isResting ? (
          'REST TIME'
        ) : (
          'ROUND IN PROGRESS'
        )}
      </div>
      <button
        onClick={startTimer}
        className={`mt-2 sm:mt-4 p-4 sm:p-6 cursor-pointer ${
          isRunning 
            ? 'bg-red-600 hover:bg-red-700 ring-4 ring-red-500/50' 
            : 'bg-red-500 hover:bg-red-600 animate-pulse ring-2 ring-red-400/30'
        } rounded-full transition-colors shadow-lg hover:shadow-red-500/20 transform hover:scale-105`}
        aria-label={isRunning ? "Stop Timer" : "Start Timer"}
      >
        <Bell size={32} className="text-white sm:w-10 sm:h-10" />
      </button>
    </div>
  );
};