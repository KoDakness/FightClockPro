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

  const [sounds, setSounds] = useState(() => {
    const bell = new Audio(bellSoundUrl);
    const click = new Audio(clickSoundUrl);
    const sticks = new Audio(sticksSoundUrl);
    
    [bell, click, sticks].forEach(audio => {
      audio.preload = 'auto';
      audio.load();
    });
    
    return { bell, click, sticks };
  });

  useEffect(() => {
    const { bell, click, sticks } = sounds;
    bell.load();
    click.load();
    sticks.load();

    return () => {
      bell.pause();
      click.pause();
      sticks.pause();
    };
  }, [sounds]);

  const handleSoundChange = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();

    localStorage.setItem('boxingTimer_bellSound', url);
    setSounds(prev => ({ ...prev, bell: audio }));
  }, []);

  const resetSound = useCallback(() => {
    const defaultBell = new Audio(bellSoundUrl);
    defaultBell.preload = 'auto';
    localStorage.removeItem('boxingTimer_bellSound');
    defaultBell.load();
    setSounds(prev => ({ ...prev, bell: defaultBell }));
  }, []);

  const playBell = useCallback(() => {
    try {
      const { bell } = sounds;
      // Stop any currently playing bell sound
      bell.pause();
      bell.currentTime = 0;
      
      // Set a short duration for the bell sound
      setTimeout(() => {
        bell.pause();
        bell.currentTime = 0;
      }, 4000); // Play for 4 seconds
      
      const playPromise = bell.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Could not play bell sound:', error);
        });
      }
    } catch (error) {
      console.warn('Error playing bell sound:', error);
    }
  }, [sounds]);

  const playClick = useCallback(() => {
    const { click } = sounds;
    click.pause();
    click.currentTime = 0;
    const playPromise = click.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
      console.warn('Could not play click sound');
      });
    }
  }, [sounds]);

  const playSticks = useCallback(() => {
    const { sticks } = sounds;
    sticks.pause();
    sticks.currentTime = 0;
    sticks.play().catch(() => {
      console.warn('Could not play sticks sound');
    });
  }, [sounds]);

  const reset = useCallback(() => {
    const { bell, click, sticks } = sounds;
    setIsRunning(false);
    setCurrentRound(1);
    bell.pause();
    click.pause();
    sticks.pause();
    setTimeLeft(roundTime);
    setIsResting(false);
    setRestTimeLeft(restTime);
    setInitialCountdown(null);
  }
  )

  const startTimer = useCallback(() => {
    if (!isRunning && initialCountdown === null) {
      setTimeLeft(roundTime);
      setIsRunning(false);
      setInitialCountdown(10);
    } else {
      setIsRunning(false);
      setInitialCountdown(null);
    }
  }, [isRunning, initialCountdown, roundTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let clickTimeout: NodeJS.Timeout;

    if (initialCountdown !== null) {
      interval = setInterval(() => {
        setInitialCountdown(prev => {
          if (prev === null) {
            return null;
          }
          if (prev === 0) {
            playBell();
            if (clickTimeout) clearTimeout(clickTimeout);
            setIsRunning(true);
            return null;
          }
          if (prev > 0) {
            if (clickTimeout) clearTimeout(clickTimeout);
            playClick();
            clickTimeout = setTimeout(() => {
              sounds.click.pause();
              sounds.click.currentTime = 0;
            }, 300);
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
              playSticks();
            }
            if (prev === 0) {
              if (currentRound < totalRounds) {
                setIsResting(true);
                setRestTimeLeft(restTime);
                playBell();
              } else {
                playBell();
                reset();
              }
              return roundTime;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      if (clickTimeout) clearTimeout(clickTimeout);
    };
  }, [isRunning, isResting, currentRound, totalRounds, roundTime, restTime, playBell, playClick, playSticks, reset, initialCountdown, sounds]);

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