import type { IconType } from 'react-icons';
import { TextLink } from 'components';

interface ROWCARD_INTERFACE {
  cardImg: { img: string; altText: string };
  header: string;
  description: string;
  cardIcon?: { img: string; altText: string };
  callToAction: {
    text: string;
    route: string;
    icon: {
      Icon: IconType;
      iconStyle?: string;
    };
  };
  reverseDir?: boolean; // decide the card content direction style, if true the flex row direction will be reverse
  className?: string;
}

const RowCard = (props: ROWCARD_INTERFACE): React.ReactElement => {
  const {
    cardImg,
    header,
    description,
    cardIcon,
    callToAction,
    reverseDir,
    className,
  } = props;
  const cardDirectionStyle = reverseDir ? 'sm:flex-row' : 'sm:flex-row-reverse';

  return (
    <div
      className={`flex flex-col justify-between ${cardDirectionStyle} overflow-hidden ${className}`}
    >
      <div className="mx-auto mb-8 max-w-[28rem] sm:mx-0 sm:mb-0 sm:max-w-[calc(50%-3rem)]">
        <img
          className="mx-auto block max-h-[22rem] max-w-full"
          src={cardImg.img}
          alt={cardImg.altText}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center sm:max-w-[calc(50%-3rem)]">
        {cardIcon && (
          <img
            className="mb-5 hidden max-w-[4rem] sm:block"
            src={cardIcon.img}
            alt={cardIcon.altText}
          />
        )}
        <div className="mb-4 max-w-md sm:mb-5 sm:max-w-none">
          <p className="text-2xl font-semibold sm:text-4xl">{header}</p>
          <p className="mt-3 text-lg sm:mt-5 sm:text-2xl">{description}</p>
        </div>

        <TextLink
          text={callToAction.text}
          className="flex flex-row items-center gap-1 text-base font-bold uppercase tracking-wider text-green-550 hover:text-green-500"
          route={callToAction.route}
          underline={false}
          icon={{ Icon: callToAction.icon.Icon, iconStyle: 'mt-1' }}
        />
      </div>
    </div>
  );
};

export default RowCard;
