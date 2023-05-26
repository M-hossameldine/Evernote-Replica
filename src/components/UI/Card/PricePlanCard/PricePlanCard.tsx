import "tw-elements";

import { BiCheck, IoIosArrowRoundBack, IoIosArrowRoundUp } from "assets";
import { ContainedLink } from "components";
import { PRICE_PLAN_DATA_INTERFACE } from "interfaces";

const PricePlanCard: React.FC<{
  cardData: PRICE_PLAN_DATA_INTERFACE;
  index: number;
}> = (props) => {
  const { id, title, price, note, features, callToAction } = props.cardData;
  const { index: cardIndex } = props;
  const showFeaturesByDefault = cardIndex === 0 ? "show" : "";

  const featureList = (
    <ul>
      {features.map((feature, featureIndex) => (
        <li
          key={feature.id}
          className="flex items-start mb-2 font-[400] tracking-tight "
        >
          <span
            className={`inline-flex items-center justify-center flex-shrink-0 mr-2 text-green-600`}
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
    <div className="w-full bg-neutral-100 rounded-xl p-4">
      <div className="accordion-item">
        <h2 className="accordion-header mb-4" id={`heading${id}5`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-semibold tracking-widest uppercase">
              {title}
            </h3>
            <AccordionBtn id={id} isCollapsed={cardIndex > 0 ? true : false} />
          </div>
          <div className="flex items-end text-3xl font-bold leading-none lg:text-4xl ">
            ${price}
            {+price > 0 && (
              <span className="text-base font-semibold uppercase ml-1">
                / month
              </span>
            )}
          </div>
        </h2>
        <p className="text-lg font-semibold tracking-wider mt-6 mb-3">{note}</p>
        <div
          id={`collapse${id}5`}
          className={`accordion-collapse collapse md:hidden ${showFeaturesByDefault}`}
          aria-labelledby={`heading${id}5`}
        >
          <div className="accordion-body">{featureList}</div>
        </div>
        <div className="hidden md:block">{featureList}</div>
        <ContainedLink
          text={callToAction.text}
          route={callToAction.route}
          className="w-full text-center font-semibold text-white bg-green-500 hover:bg-green-450 mt-4"
        />
      </div>
    </div>
  );
};

export default PricePlanCard;

const AccordionBtn: React.FC<{ id: string; isCollapsed: boolean }> = (
  props
) => {
  const { id, isCollapsed } = props;

  const btnClasses = `accordion-button {collapseStyle} relative flex md:hidden items-center !shadow-none transition focus:outline-none after:rounded-full after:bg-green-550  
  after:flex after:items-center after:justify-center after:w-8 after:h-8 after:!bg-none after:content-arrow-angle-up after:p-[7px]
  ${isCollapsed ? "collapsed" : ""}`;

  return (
    <button
      className={btnClasses}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#collapse${id}5`}
      aria-expanded="true"
      aria-controls={`collapse${id}5`}
    ></button>
  );
};

const FeatureArrowIcon: React.FC = () => {
  return (
    <>
      <IoIosArrowRoundUp className="md:hidden text-green-600" size="28" />
      <IoIosArrowRoundBack
        className="hidden md:block text-green-600"
        size="28"
      />
    </>
  );
};
