import { Fragment } from 'react';
import styled from 'styled-components';

import { Level } from './../services/Cards';
import { Message } from './Message';

import { Button } from './Button';

interface Props {
  setLevel: React.Dispatch<React.SetStateAction<Level | null>>
}

const ListSelector = styled.div`
  margin-top: 1.15em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const LevelSelector: React.FC<Props> = ({setLevel}) => {
  const setEasy = (): void => setLevel(Level.Easy);
  const setNormal = (): void => setLevel(Level.Normal);
  const setHard = (): void => setLevel(Level.Hard);

  return (
    <Fragment>
      <Message>Select the difficulty level:</Message>
      <ListSelector>
        <Button onClick={setEasy}>Easy</Button>
        <Button onClick={setNormal}>Normal</Button>
        <Button onClick={setHard}>Hard</Button>
      </ListSelector>
    </Fragment>
  );
}

