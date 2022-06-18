import 'tw-elements';

import { PricePlanCard } from '../../components';
import { PRICE_PLAN_DATA_INTERFACE } from '../../interfaces';

import { BsArrowRightCircleFill, FiArrowRight } from '../../assets';

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
    <>
      <div className={accordionClasses} id='accordionExample5'>
        {data.map((card, index) => {
          return <PricePlanCard cardData={card} index={index} />;
        })}
      </div>
      <div className='max-w-4xl mx-auto mt-10 p-5 border-2 border-neutral-200 rounded-xl'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-2xl uppercase pb-3'>Evernote Teams</h3>
            <p className='text-4xl sm:text-[40px] font-semibold pb-6'>
              $14.99
              <span className='text-base sm:text-lg uppercase font-semibold'>
                {' '}
                / user / month
              </span>
            </p>
          </div>
          <div className='text-green-600'>
            <BsArrowRightCircleFill
              size='28'
              className='block sm:hidden cursor-pointer'
            />
            <div className='hidden sm:block rounded-full border-[3px] border-green-600 cursor-pointer p-5 mt-5'>
              <FiArrowRight size='42' />
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
