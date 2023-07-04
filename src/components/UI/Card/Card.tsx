type PropsType = {
  children?: React.ReactNode;
  className?: string;
};

const Card = (props: PropsType): React.ReactElement => {
  const cardClasses = props.className ? props.className : "";

  return (
    <div className={`shadow-even-2 rounded-lg ${cardClasses}`}>
      {props.children}
    </div>
  );
};

export default Card;
