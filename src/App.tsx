import { Fragment, useEffect, useState } from 'react';

import { useStopWatch } from './hooks/useStopWatch';

import { getCards, Card, Level } from './services/Cards';

import { Button } from './components/Button';
import { Container } from './components/Container';
import { Game } from './components/Game';
import { LevelSelector } from './components/LevelSelector';
import { Message } from './components/Message';
import { Timer } from './components/Timer';
import { Title } from './components/Title';

enum Status {
  Null = 'null',
  Running = 'running',
  Finished = 'finished',
  SelectLevel = 'selectLevel'
}

export const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [level, setLevel] = useState<Level | null>(null);
  const [status, setStatus] = useState(Status.Null);
  const stopwatch = useStopWatch();

  useEffect(() => {
    if (cards.length !== 0 && finished()) {
      finish();
    }
  }, [cards]); // eslint-disable-line

  useEffect(() => {
    if (level !== null) {
      play();
    }
  }, [level]); // eslint-disable-line

  /**
   * Change the status to SelectLevel to show the buttons
   */
  const showLevelSelector = (): void => {
    setStatus(Status.SelectLevel);
  }

  /**
   * Change the status to running, get the cards depending on the level and start the timer
   */
  const play = (): void => {
    if (level === null) return;
    setCards(getCards(level));
    setStatus(Status.Running);
    stopwatch.start();
  }

  /**
   * Reset the timer and change the state to show the level selector
   */
  const playAgain = (): void => {
    showLevelSelector();
    stopwatch.reset();
  }

  /**
   * Change the status to finish and stop the timer
   */
  const finish = (): void => {
    setStatus(Status.Finished);
    stopwatch.stop();
  }

  /**
   * Check if all cards are flipped
   */
  const finished = (): boolean => cards.every(c => c.flipped);

  return (
    <Container>
      <Title>Memory Game</Title>
      { status === Status.Null ?
          <Button onClick={showLevelSelector}>Play</Button>
        : status === Status.SelectLevel ?
          <LevelSelector setLevel={setLevel}/>
        : status === Status.Running ?
          <Game
            cards={cards}
            setCards={setCards}
            time={stopwatch.time}
          />
        : status === Status.Finished ?
          <Fragment>
            <Message>Great! You finished in:</Message>
            <Timer blink time={stopwatch.time} />
            <Button onClick={playAgain}>Play again</Button>
          </Fragment>
        : null
      }
    </Container>
  );
}

