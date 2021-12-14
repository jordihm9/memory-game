import { shuffle } from './../utils/Shuffle';

export type Card = {
  id: number,
  color: string,
  flipped?: boolean
}

export enum Level {
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'Hard'
}

const easyCardsLevel: Card[] = [
  {id: 1, color: '#ff0000'}, // red
  {id: 2, color: '#00ff00'}, // green
  {id: 3, color: '#0000ff'}, // blue
  {id: 4, color: '#ffff00'}, // yellow
  {id: 5, color: '#ff00ff'}, // pink
  {id: 6, color: '#ff7700'}, // orange
]

const normalCardsLevel: Card[] = [
  ...easyCardsLevel,
  {id: 7, color: '#8c00ff'}, // purple
  {id: 8, color: '#00ffff'}, // light blue (cian)
  {id: 9, color: '#226500'}, // dark green
  {id: 10, color: '#655400'}, // brown
]

const hardCardsLevel: Card[] = [
  ...normalCardsLevel,
  {id: 11, color: '#700054'}, // dark purple/pink
  {id: 12, color: '#c38fff'}, // light purple (violet)
  {id: 13, color: '#f9706f'}, // light red (salmon)
  {id: 14, color: '#6ff988'}, // light green (lime)
  {id: 15, color: '#6f7df9'}, // light electric blue
]

export const getCards = (level: Level): Card[] => {
  let cards: Card[] = [];

  switch (level) {
    case Level.Easy:
      cards = easyCardsLevel;
      break;
    case Level.Normal:
      cards = normalCardsLevel;
      break;
    case Level.Hard:
      cards = hardCardsLevel;
      break;
  }

  return shuffle([...cards, ...cards]);
}

