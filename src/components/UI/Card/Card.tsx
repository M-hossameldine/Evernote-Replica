type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = (props) => {
  const cardClasses = props.className ? props.className : "";

  return (
    <div className={`shadow-even-2 rounded-lg ${cardClasses}`}>
      {props.children}
    </div>
  );
};

export default Card;
