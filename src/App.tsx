import { Fragment, useEffect, useState } from 'react';

import { useStopWatch } from './hooks/useStopWatch';

import { getCards, Card } from './services/Cards';

import { Game } from './components/Game';
import { Button } from './components/Button';
import { Timer } from './components/Timer';

enum Status {
  Null = 'a',
  Running = 'b',
  Finished = 'c'
}

export const App: React.FC = () => {
  const [status, setStatus] = useState(Status.Null);
  const [cards, setCards] = useState<Card[]>(getCards());
  const stopwatch = useStopWatch();

  useEffect(() => {
    if (finished()) {
      finish();
    }
  }, [cards]); // eslint-disable-line

  /**
   * Change the status to running and start the timer
   */
  const play = (): void => {
    setStatus(Status.Running);
    stopwatch.start();
  }

  /**
   * Reset the cards array, reset the timer and play
   */
  const playAgain = (): void => {
    reset();
    stopwatch.reset();
    play();
  }

  /**
   * Change the status to finish and stop the timer
   */
  const finish = (): void => {
    setStatus(Status.Finished);
    stopwatch.stop();
  }

  /**
   * Reset the cards array
   */
  const reset = (): void => {
    setCards(getCards());
  }

  /**
   * Check if all cards are flipped
   */
  const finished = (): boolean => cards.every(c => c.flipped);

  return (
    <Fragment>
      { status === Status.Null ?
          <Button onClick={play}>Start</Button>
        : status === Status.Running ?
          <Game
            cards={cards}
            setCards={setCards}
            time={stopwatch.time}
          />
        : status === Status.Finished ?
          <Fragment>
            <Timer time={stopwatch.time} />
            <Button onClick={playAgain}>Play</Button>
          </Fragment>
        : null
      }
    </Fragment>
  );
}

