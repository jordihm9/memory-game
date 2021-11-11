import { useState } from 'react';

enum Status {
  Null = 'a',
  Running = 'b',
  Stopped = 'c'
}

export const useStopWatch = () => {
  const [status, setStatus] = useState(Status.Null);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const start = (): void => {
    setStatus(Status.Running);
    setTimer(setInterval(() => {
      setTime(time => time + 10);
    }, 10));
  }

  const stop = (): void => {
    setStatus(Status.Stopped);
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  }

  const reset = (): void => {
    setTime(0);
  }

  return {
    status,
    time,
    start,
    stop,
    reset
  };
}

