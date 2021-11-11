import styled from 'styled-components';

interface Props {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.5em 1em;
  outline: none;
  border: 1px solid #000;
`;

export const Button: React.FC<Props> = ({children, ...props}) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

