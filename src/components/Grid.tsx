import styled from 'styled-components';

interface GridProps {
  columns: number,
}

export const Grid = styled.div<GridProps>`
  --card-size: 75px;
  --gap: 0.65em;

  margin: auto;
  max-width: calc(${({columns}) => `(${`${columns} * var(--card-size)`}) + (${`${columns} * var(--gap)`})`});
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(auto-fill, minmax(var(--card-size), 1fr));
  place-items: center;

  @media screen and (min-width: 600px) {
    --card-size: 100px;
    --gap: 1em;
  }
`;

