import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Card as CardType } from './../services/Cards';

interface Props {
  card: CardType,
  flippedCards: CardType[],
  flipCard: (card: CardType) => void
}

interface ColoredDivProps {
  color: string,
  flipped?: boolean
}

const ColoredDiv = styled.div<ColoredDivProps>`
  width: 100px;
  height: 100px;
  background-color: ${({color, flipped}) => flipped ? color : '#000'};
  cursor: pointer;
`;

export const Card: React.FC<Props> = ({card, flippedCards, flipCard}) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      if (flippedCards[0].id !== flippedCards[1].id) {
        if (!card.flipped && flipped) {
          setTimeout(flip, 1000);
        }
      }
    }
  })
  
  const handleClick = () => {
    if (!card.flipped && !flipped) {
      flip();
      flipCard(card);
    }
  }

  /**
   * Flip the card
   */
  const flip = () => {
    setFlipped(!flipped);
  }

  return (
    <div className="card" onClick={handleClick}>
      <ColoredDiv
        color={card.color}
        flipped={card.flipped || flipped}
      />
    </div>
  );
}

