import { useState, useEffect, useCallback } from 'react';
import bellSoundUrl from '../assets/sounds/bell.mp3';
import clickSoundUrl from '../assets/sounds/click.mp3';
import sticksSoundUrl from '../assets/sounds/sticks.mp3';

export const useTimer = (
  initialRoundTime: number,
  initialRestTime: number,
  initialTotalRounds: number
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(initialRoundTime);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(initialRestTime);
  const [roundTime, setRoundTime] = useState(initialRoundTime);
  const [restTime, setRestTime] = useState(initialRestTime);
  const [totalRounds, setTotalRounds] = useState(initialTotalRounds);
  const [initialCountdown, setInitialCountdown] = useState<number | null>(null);

  // Use a more reliable bell sound
  const [bellSound, setBellSound] = useState(() => {
    const storedSound = localStorage.getItem('boxingTimer_bellSound');
    const audio = new Audio(storedSound || bellSoundUrl);
    audio.load();
    return audio;
  });
  const clickSound = new Audio(clickSoundUrl);
  const sticksSound = new Audio(sticksSoundUrl);

  useEffect(() => {
    bellSound.load();
    clickSound.load();
    sticksSound.load();
  }, [bellSound]);

  const handleSoundChange = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    
    // Store in localStorage
    localStorage.setItem('boxingTimer_bellSound', url);
    
    setBellSound(audio);
  }, []);

  const resetSound = useCallback(() => {
    const defaultBell = new Audio(bellSoundUrl);
    // Clear localStorage
    localStorage.removeItem('boxingTimer_bellSound');
    defaultBell.load();
    setBellSound(defaultBell);
  }, []);

  const playBell = useCallback(() => {
    try {
      bellSound.currentTime = 0;
      const playPromise = bellSound.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Could not play bell sound:', error);
        });
      }
    } catch (error) {
      console.warn('Error playing bell sound:', error);
    }
  }, [bellSound]);

  const playClick = useCallback(() => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {
      console.warn('Could not play click sound');
    });
  }, [clickSound]);

  const playSticks = useCallback(() => {
    sticksSound.currentTime = 0;
    sticksSound.play().catch(() => {
      console.warn('Could not play sticks sound');
    });
  }, [sticksSound]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentRound(1);
    setTimeLeft(roundTime);
    setIsResting(false);
    setRestTimeLeft(restTime);
    setInitialCountdown(null);
  }, [roundTime, restTime]);

  const startTimer = useCallback(() => {
    if (!isRunning && initialCountdown === null) {
      setTimeLeft(roundTime);
      setInitialCountdown(10);
    } else {
      setIsRunning(false);
      setInitialCountdown(null);
    }
  }, [isRunning, initialCountdown, roundTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (initialCountdown !== null) {
      interval = setInterval(() => {
        setInitialCountdown(prev => {
          if (prev === null) return null;
          if (prev <= 0) {
            playBell();
            setIsRunning(true);
            return null;
          }
          if (prev <= 10) {
            playClick();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isRunning) {
      interval = setInterval(() => {
        if (isResting) {
          setRestTimeLeft(prev => {
            if (prev === 0) {
              setCurrentRound(r => r + 1);
              setIsResting(false);
              setTimeLeft(roundTime);
              playBell();
              return restTime;
            }
            return prev - 1;
          });
        } else {
          setTimeLeft(prev => {
            if (prev === 10) {
              playClick();
            } else if (prev <= 10 && prev > 0) {
              playSticks();
            }
            if (prev === 0) {
              if (currentRound < totalRounds) {
                setIsResting(true);
                setRestTimeLeft(restTime);
                playBell();
              } else {
                reset();
                playBell();
              }
              return roundTime;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isResting, currentRound, totalRounds, roundTime, restTime, playBell, playClick, playSticks, reset, initialCountdown]);

  return {
    isRunning,
    currentRound,
    timeLeft,
    isResting,
    restTimeLeft,
    roundTime,
    restTime,
    totalRounds,
    startTimer,
    initialCountdown,
    setIsRunning,
    setRoundTime,
    setRestTime,
    setTotalRounds,
    reset,
    playBell,
    handleSoundChange,
    resetSound,
  };
};