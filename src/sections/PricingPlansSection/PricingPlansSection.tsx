import type { PRICE_PLAN_DATA_INTERFACE } from 'interfaces';
import 'tw-elements';

import { BsArrowRightCircleFill, FiArrowRight } from '~assets';

import PricePlanCard from '~components/Cards/PricePlanCard';

interface PricingPlansSection_INTERFACE {
  className?: string;
  data: PRICE_PLAN_DATA_INTERFACE[];
}
const PricingPlansSection = (
  props: PricingPlansSection_INTERFACE
): React.ReactElement => {
  const { className, data } = props;

  const accordionClasses = `accordion ${className ? className : ''}`;
  return (
    <>
      <div className={accordionClasses} id="accordionExample5">
        {data.map((card, index) => {
          return <PricePlanCard key={card.id} cardData={card} index={index} />;
        })}
      </div>
      <div className="mx-auto mt-10 max-w-4xl rounded-xl border-2 border-neutral-200 p-5">
        <div className="flex justify-between">
          <div>
            <h3 className="pb-3 text-2xl uppercase">Evernote Teams</h3>
            <p className="pb-6 text-4xl font-semibold sm:text-[40px]">
              $14.99
              <span className="text-base font-semibold uppercase sm:text-lg">
                {' '}
                / user / month
              </span>
            </p>
          </div>
          <div className="text-green-600">
            <BsArrowRightCircleFill
              size="28"
              className="block cursor-pointer sm:hidden"
            />
            <div className="mt-5 hidden cursor-pointer rounded-full border-[3px] border-green-600 p-5 sm:block">
              <FiArrowRight size="42" />
            </div>
          </div>
        </div>
        <p>
          Collaborate and share knowledge to keep your team on the same page.
        </p>
      </div>
    </>
  );
};

export default PricingPlansSection;
