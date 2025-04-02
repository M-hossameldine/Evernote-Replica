import { ProductFeaturesData } from '../../assets/StaticData';

import RowCard from '~components/Cards/RowCard';

interface ProductFeaturesSectionProps {
  className?: string;
}

export const ProductFeaturesSection = (
  props: ProductFeaturesSectionProps
): React.ReactElement => {
  const { className } = props;

  return (
    <section className={className ? className : ''}>
      {ProductFeaturesData.map((card, index) => {
        const isOdd = index % 2 !== 0; // reverse card direction

        return (
          <RowCard key={index} {...card} reverseDir={isOdd} className="mt-20" />
        );
      })}
    </section>
  );
};

export default ProductFeaturesSection;
