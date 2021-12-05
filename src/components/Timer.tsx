import styled from 'styled-components';

interface Props {
  time: number,
  blink?: boolean 
}

interface StylesProps {
  blink?: boolean
}

const StyledTimer = styled.div<StylesProps>`
  margin: 1em 0; 
  font-size: 1.75em;
  text-align: center;
  font-variant-numeric: tabular-nums;
  ${({blink}) => blink ? 'animation: blink infinite 2500ms alternate;' : null}
  transition: opacity 200ms ease-ease-in-out;

  @keyframes blink {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export const Timer: React.FC<Props> = ({time, blink}) => {
 const format = (n: number): string => n >= 10 ? n.toString() : '0' + n.toString();

 const minutes = (): number => Math.floor((time / 60000) % 60);

 const seconds = (): number => Math.floor((time / 1000) % 60);

 const miliseconds = (): number => (time / 10) % 100;

 return (
    <StyledTimer blink={blink}>
      <span>{format(minutes())}</span>:
      <span>{format(seconds())}</span>.
      <span>{format(miliseconds())}</span>
    </StyledTimer>
  );
}

