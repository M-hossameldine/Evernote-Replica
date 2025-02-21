import { RowCard } from 'components';
import { HOME_FEATURE_ZIGZAG_DATA_INTERFACE } from 'interfaces';

interface ComponentInterface {
  dataList: HOME_FEATURE_ZIGZAG_DATA_INTERFACE[];
  className?: string;
}

const FeatureZigzagSection = (
  props: ComponentInterface
): React.ReactElement => {
  const { className, dataList } = props;

  return (
    <section className={className ? className : ''}>
      {dataList.map((card, index) => {
        const isOdd = index % 2 !== 0; // reverse card direction

        return (
          <RowCard
            key={card.id}
            {...card}
            reverseDir={isOdd}
            className="mt-20"
          />
        );
      })}
    </section>
  );
};

export default FeatureZigzagSection;
