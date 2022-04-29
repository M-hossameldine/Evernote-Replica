import { ELEMENT_ATTRIBUTES_INTERFACE } from '../../../interfaces/element-attributes-interface';

const Card: React.FC<ELEMENT_ATTRIBUTES_INTERFACE> = (props) => {
  const cardClasses = props.className ? props.className : '';

  return (
    <div className={`shadow-even-2 rounded-lg ${cardClasses}`}>
      {props.children}
    </div>
  );
};

export default Card;
