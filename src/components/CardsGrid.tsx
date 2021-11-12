import styled from 'styled-components';

import { Card as CardType } from './../services/Cards';

import { Card } from './Card';

interface Props {
  cards: CardType[],
  flippedCards: CardType[],
  flipCard: (card: CardType) => void
}

interface GridProps {
  columns: number,
}

const Grid = styled.div<GridProps>`
  margin: 5rem auto;
  width: fit-content;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr);
`;

export const CardsGrid: React.FC<Props> = ({ cards, flippedCards, flipCard }) => {
  return (
    <Grid columns={Math.floor(Math.sqrt(cards.length))}>
      { cards.map((c, i)=> (
        <Card
          key={`${i}-${c.id}`}
          card={c}
          flippedCards={flippedCards}
          flipCard={flipCard}
        />
      ))}
    </Grid>
  );
}

