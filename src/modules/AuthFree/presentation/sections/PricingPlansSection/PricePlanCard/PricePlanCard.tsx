import type { PricePlanCardData } from '~modules/AuthFree/presentation/assets/StaticData';
import 'tw-elements';

import { BiCheck } from 'react-icons/bi';
import { IoIosArrowRoundBack, IoIosArrowRoundUp } from 'react-icons/io';

import { ContainedLink } from '~components/Links';

type PropsType = {
  cardData: PricePlanCardData;
  index: number;
};

const PricePlanCard = (props: PropsType): React.ReactElement => {
  const { title, price, note, features, callToAction } = props.cardData;
  const { index: cardIndex } = props;
  const showFeaturesByDefault = cardIndex === 0 ? 'show' : '';

  const featureList = (
    <ul>
      {features.map((feature, featureIndex) => (
        <li
          key={featureIndex}
          className="mb-2 flex items-start font-[400] tracking-tight"
        >
          <span
            className={`mr-2 inline-flex flex-shrink-0 items-center justify-center text-green-600`}
          >
            {cardIndex !== 0 && featureIndex === 0 ? (
              <FeatureArrowIcon />
            ) : (
              <BiCheck size="28" />
            )}
          </span>
          <p>{feature.text}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-full rounded-xl bg-neutral-100 p-4">
      <div className="accordion-item">
        <h2 className="accordion-header mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-2xl font-semibold uppercase tracking-widest">
              {title}
            </h3>
          </div>
          <div className="flex items-end text-3xl font-bold leading-none lg:text-4xl">
            ${price}
            {+price > 0 && (
              <span className="ml-1 text-base font-semibold uppercase">
                / month
              </span>
            )}
          </div>
        </h2>
        <p className="mb-3 mt-6 text-lg font-semibold tracking-wider">{note}</p>
        <div
          className={`accordion-collapse collapse md:hidden ${showFeaturesByDefault}`}
        >
          <div className="accordion-body">{featureList}</div>
        </div>
        <div className="hidden md:block">{featureList}</div>
        <ContainedLink
          text={callToAction.text}
          route={callToAction.route}
          className="mt-4 w-full bg-green-500 text-center font-semibold text-white hover:bg-green-450"
        />
      </div>
    </div>
  );
};

export default PricePlanCard;

const FeatureArrowIcon: React.FC = () => {
  return (
    <>
      <IoIosArrowRoundUp className="text-green-600 md:hidden" size="28" />
      <IoIosArrowRoundBack
        className="hidden text-green-600 md:block"
        size="28"
      />
    </>
  );
};
