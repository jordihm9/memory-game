import { shuffle } from './../utils/Shuffle';

export type Card = {
  id: number,
  color: string,
  flipped?: boolean
}

const cards: Card[] = [
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

export const getCards = (): Card[] => {
  return shuffle([...cards, ...cards]);
}

