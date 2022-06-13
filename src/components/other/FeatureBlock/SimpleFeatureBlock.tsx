import { TEXT_INTERFACE } from '../../../interfaces';

interface COMPONENT_INTERFACE {
  title: TEXT_INTERFACE;
  description: TEXT_INTERFACE;
  className?: string;
}

const SimpleFeatureBlock: React.FC<COMPONENT_INTERFACE> = (props) => {
  const { title, description, className } = props;

  const blockClasses = className ? className : '';
  const titleClasses = title.className ? title.className : '';
  const descriptionClasses = description.className ? description.className : '';

  return (
    <div className={blockClasses}>
      <h3 className={titleClasses}>{title.text}</h3>
      <p className={descriptionClasses}>{description.text}</p>
    </div>
  );
};

export default SimpleFeatureBlock;
