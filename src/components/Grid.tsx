import styled from 'styled-components';

interface GridProps {
  columns: number,
}

export const Grid = styled.div<GridProps>`
  margin: auto;
  width: fit-content;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr);
`;

