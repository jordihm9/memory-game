import { Fragment, useEffect, useState } from 'react';

import { useStopWatch } from './hooks/useStopWatch';

import { Board } from './components/Board';
import { Timer } from './components/Timer';

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

export const App: React.FC = () => {
  const [cards, setCards] = useState(shuffle([...getData(), ...getData()]))
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const stopwatch = useStopWatch();

  useEffect(() => {
    if (flippedCards.length === 2) {
      compareFlippedCards();
      setFlippedCards([]); // reset the flipped cards
    }
  }, [flippedCards]); // eslint-disable-line

  /**
   * Check if the cards stored in the flipped array are equal
   * If the cards are equal, set the flipped property to true
   */
  const compareFlippedCards = (): void => {
    if (flippedCards[0].id === flippedCards[1].id) {
      setCards(cards.reduce((ack, c) => {
        ack.push(c.id === flippedCards[0].id ? {...c, flipped: true} : c);
        return ack;
      }, []));
    }
  }

  /**
   * Add a card to the flippedCards array
   */
  const flipCard = (card: CardType): void => {
    setFlippedCards([...flippedCards, card]);
  }

  return (
    <Fragment>
      <Timer time={stopwatch.time}/>
      <button onClick={() => stopwatch.start()}>Start</button>
      <button onClick={() => stopwatch.stop()}>Stop</button>
      <Board
        cards={cards}
        flippedCards={flippedCards}
        flipCard={flipCard}
      />
    </Fragment>
  );
}

