import React from 'react';
import { Dumbbell, Coffee, Github, MessageSquare } from 'lucide-react';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { SoundSettings } from './components/SoundSettings';
import { useTimer } from './hooks/useTimer';

function App() {
  const {
    isRunning,
    currentRound,
    timeLeft,
    isResting,
    restTimeLeft,
    initialCountdown,
    roundTime,
    restTime,
    totalRounds,
    startTimer,
    setRoundTime,
    setRestTime,
    setTotalRounds,
    reset,
    playBell,
    handleSoundChange,
    resetSound,
  } = useTimer(180, 10, 3); // 3 minutes round, 10 seconds rest, 3 rounds

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-8 border border-zinc-700/50">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Dumbbell className="w-12 h-12 text-red-500" />
          <h1 className="text-4xl font-bold text-red-500">
            Fight Clock Pro
          </h1>
        </div>
        
        <Timer
          currentRound={currentRound}
          totalRounds={totalRounds}
          isRunning={isRunning}
          timeLeft={timeLeft}
          isResting={isResting}
          restTimeLeft={restTimeLeft}
          initialCountdown={initialCountdown}
          onManualBell={startTimer}
        />

        <Controls
          isRunning={isRunning}
          startTimer={startTimer}
          onPause={() => setIsRunning(false)}
          onReset={reset}
          roundTime={roundTime}
          restTime={restTime}
          totalRounds={totalRounds}
          onRoundTimeChange={setRoundTime}
          onRestTimeChange={setRestTime}
          onTotalRoundsChange={setTotalRounds}
        />
        
        <SoundSettings
          onSoundChange={(file) => handleSoundChange(file)}
          onResetSound={resetSound}
        />

        <div className="border-t border-zinc-700/50 pt-6">
          <div className="flex items-center justify-center space-x-8">
            <a
              href="https://discord.gg/QmdfwQH7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-zinc-300 hover:text-red-500 transition-colors group"
            >
              <MessageSquare className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-base font-semibold">Discord</span>
            </a>
            <a
              href="https://paypal.me/KoDarknee94"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-zinc-300 hover:text-red-500 transition-colors group"
            >
              <Coffee className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-base font-semibold">Buy me a coffee</span>
            </a>
            <a
              href="https://github.com/KoDarkness"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-zinc-300 hover:text-red-500 transition-colors group"
            >
              <Github className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-base font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;