import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CardType } from './../App';

import { CardsGrid } from './CardsGrid';
import { Timer } from './Timer';

interface Props {
  cards: CardType[],
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  time: number
}

const Container = styled.div``;

export const Game: React.FC<Props> = ({cards, setCards, time}) => {
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);

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
      setCards(cards.reduce((ack: CardType[], c) => {
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
    <Container>
      <Timer time={time}/>
      <CardsGrid
        cards={cards}
        flippedCards={flippedCards}
        flipCard={flipCard}
      />
    </Container>
  );
}

