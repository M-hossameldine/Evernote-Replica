import { HOME_FEATURE_ZIGZAG_DATA } from '~constants/data';

import RowCard from '~components/Cards/RowCard';

interface ComponentInterface {
  className?: string;
}

export const FeatureZigzagSection = (
  props: ComponentInterface
): React.ReactElement => {
  const { className } = props;

  return (
    <section className={className ? className : ''}>
      {HOME_FEATURE_ZIGZAG_DATA.map((card, index) => {
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
