import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useStopWatch } from './hooks/useStopWatch';

import { Board } from './components/Board';
import { Button } from './components/Button';
import { Timer } from './components/Timer';

enum Status {
  Null = 'a',
  Running = 'b',
  Finished = 'c'
}

export type CardType = {
  id: number,
  color: string,
  flipped?: boolean
}

const data: CardType[] = [
  { id: 1, color: '#a90909'},
  { id: 2, color: '#66972e'},
  { id: 3, color: '#18e1b2'},
  { id: 4, color: '#e118b1'},
  { id: 5, color: '#ff7e00'},
  { id: 6, color: '#0300c3'},
  { id: 7, color: '#c3b900'},
  { id: 8, color: '#aa00ff'},
  { id: 9, color: '#0081ff'},
  { id: 10, color: '#f8a088'}
]

const getData = (): CardType[] => data;

const shuffle = (arr: any[]): any[] => {
  return arr.sort(() => Math.random() - 0.5);
}

const Game = styled.div``;

export const App: React.FC = () => {
  const [status, setStatus] = useState(Status.Null);
  const [cards, setCards] = useState<CardType[]>(shuffle([...getData(), ...getData()]))
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const stopwatch = useStopWatch();

  useEffect(() => {
    if (flippedCards.length === 2) {
      compareFlippedCards();
      setFlippedCards([]); // reset the flipped cards
    }
  }, [flippedCards]); // eslint-disable-line

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
    setCards(shuffle([...getData(), ...getData()]));
  }

  /**
   * Check if the cards stored in the flipped array are equal
   * If the cards are equal, set the flipped property to true
   */
  const compareFlippedCards = (): void => {
    if (flippedCards[0].id === flippedCards[1].id) {
      setCards(cards.reduce((ack: CardType[], c) => {
        ack.push(c.id === flippedCards[0].id ? {...c, flipped: true} : c);
        return ack;
      }, []));
    }
  }

  /**
   * Check if all cards are flipped
   */
  const finished = (): boolean => cards.every(c => c.flipped);

  /**
   * Add a card to the flippedCards array
   */
  const flipCard = (card: CardType): void => {
    setFlippedCards([...flippedCards, card]);
  }

  return (
    <Fragment>
      { status === Status.Null ?
          <Button onClick={play}>Start</Button>
        : status === Status.Running ?
          <Game>
            <Timer time={stopwatch.time}/>
            <Board
              cards={cards}
              flippedCards={flippedCards}
              flipCard={flipCard}
            />
          </Game>
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

