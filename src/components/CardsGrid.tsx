import { Card as CardType } from './../services/Cards';

import { Card } from './Card';
import { Grid } from './Grid';

interface Props {
  cards: CardType[],
  flippedCards: CardType[],
  flipCard: (card: CardType) => void
}

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

