import { useState } from 'react';

export const useStopWatch = () => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const start = (): void => {
    setTimer(setInterval(() => {
      setTime(time => time + 10);
    }, 10));
  }

  const stop = (): void => {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  }

  return {
    time,
    start,
    stop
  };
}

