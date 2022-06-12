import { TEXT_INTERFACE } from '../../../interfaces';

interface COMPONENT_INTERFACE {
  title: TEXT_INTERFACE;
  description: TEXT_INTERFACE;
}

const SimpleFeatureBlock: React.FC<COMPONENT_INTERFACE> = (props) => {
  const { title, description } = props;

  return (
    <div className=''>
      <h3 className='text-lg font-semibold uppercase pb-2'>{title.text}</h3>
      <p className=''>{description.text}</p>
    </div>
  );
};

export default SimpleFeatureBlock;
