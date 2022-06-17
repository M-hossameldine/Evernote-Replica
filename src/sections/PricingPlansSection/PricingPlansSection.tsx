import 'tw-elements';

import { PricePlanCard, ContainedLink } from '../../components';
import { PRICE_PLAN_DATA_INTERFACE } from '../../interfaces';

interface PricingPlansSection_INTERFACE {
  className?: string;
  data: PRICE_PLAN_DATA_INTERFACE[];
}
const PricingPlansSection: React.FC<PricingPlansSection_INTERFACE> = (
  props
) => {
  const { className, data } = props;

  const accordionClasses = `accordion ${className ? className : ''}`;
  return (
    <div className={accordionClasses} id='accordionExample5'>
      {data.map((card, index) => {
        return <PricePlanCard cardData={card} index={index} />;
      })}
    </div>
  );
};

export default PricingPlansSection;
