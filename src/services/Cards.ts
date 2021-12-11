import { shuffle } from './../utils/Shuffle';

export type Card = {
  id: number,
  color: string,
  flipped?: boolean
}

const cards: Card[] = [
  {id: 1, color: '#ff0000'}, // red
  {id: 2, color: '#00ff00'}, // green
  {id: 3, color: '#0000ff'}, // blue
  {id: 4, color: '#ffff00'}, // yellow
  {id: 5, color: '#ff00ff'}, // pink
  {id: 6, color: '#00ffff'}, // light blue (cian)
  {id: 7, color: '#8c00ff'}, // purple
  {id: 8, color: '#ff7700'}, // orange
];

export const getCards = (): Card[] => {
  return shuffle([...cards, ...cards]);
}

