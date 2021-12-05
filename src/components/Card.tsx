import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Card as CardType } from './../services/Cards';

interface Props {
  card: CardType,
  flippedCards: CardType[],
  flipCard: (card: CardType) => void
}

interface StyledCardProps {
  color: string,
  flipped?: boolean
}

const StyledCard = styled.div<StyledCardProps>`
  width: 100px;
  height: 100px;
  border-radius: 0.5rem;
  background-color: ${({color, flipped}) => flipped ? color : '#292929'};
  box-shadow: 0 0 0.5rem #292929;
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
      <StyledCard
        color={card.color}
        flipped={card.flipped || flipped}
      />
    </div>
  );
}

