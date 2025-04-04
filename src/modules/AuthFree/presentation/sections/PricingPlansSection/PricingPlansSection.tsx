import 'tw-elements';

import PricePlanCard from './PricePlanCard';

import { FiArrowRight } from 'react-icons/fi';
import { BsArrowRightCircleFill } from 'react-icons/bs';

import { PricePlanData } from '../../assets/StaticData';

interface PricingPlansSectionProps {
  className?: string;
}

export const PricingPlansSection = (
  props: PricingPlansSectionProps
): React.ReactElement => {
  const { className } = props;

  const accordionClasses = `accordion ${className ? className : ''}`;
  return (
    <>
      <div className={accordionClasses} id="accordionExample5">
        {PricePlanData.map((card, index) => {
          return <PricePlanCard key={index} cardData={card} index={index} />;
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
