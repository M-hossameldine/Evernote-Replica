import { ELEMENT_ATTRIBUTES_INTERFACE } from '../../../interfaces/element-attributes-interface';

const Card: React.FC<ELEMENT_ATTRIBUTES_INTERFACE> = (props) => {
  return (
    <div className='shadow-even-1 rounded-lg px-4 py-6'>{props.children}</div>
  );
};

export default Card;
