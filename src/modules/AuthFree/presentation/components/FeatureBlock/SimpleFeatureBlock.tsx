export type Text = {
  text: string;
  className?: string;
};
interface SimpleFeatureBlockProps {
  title: Text;
  description: Text;
  className?: string;
}

const SimpleFeatureBlock = (
  props: SimpleFeatureBlockProps
): React.ReactElement => {
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
