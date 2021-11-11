interface Props {
  time: number
}

export const Timer: React.FC<Props> = ({time}) => {
 const format = (n: number): string => n > 10 ? n.toString() : '0' + n.toString();

 const minutes = (): number => Math.floor((time / 60000) % 60);

 const seconds = (): number => Math.floor((time / 1000) % 60);

 const miliseconds = (): number => (time / 10) % 100;

 return (
    <div>
      <span>{format(minutes())}</span>:
      <span>{format(seconds())}</span>.
      <span>{format(miliseconds())}</span>
    </div>
  );
}

