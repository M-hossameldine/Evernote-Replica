import { IconType } from 'react-icons';
import { TextLink } from '../../..';

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

const RowCard: React.FC<ROWCARD_INTERFACE> = (props) => {
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
      <div className='max-w-[28rem] sm:max-w-[calc(50%-3rem)]  mx-auto sm:mx-0 mb-8 sm:mb-0'>
        <img
          className='block max-w-full max-h-[22rem] mx-auto'
          src={cardImg.img}
          alt={cardImg.altText}
        />
      </div>
      <div className='sm:max-w-[calc(50%-3rem)] flex flex-col justify-center flex-1 '>
        {cardIcon && (
          <img
            className='hidden sm:block max-w-[4rem] mb-5'
            src={cardIcon.img}
            alt={cardIcon.altText}
          />
        )}
        <div className='max-w-md sm:max-w-none mb-4 sm:mb-5'>
          <p className='text-2xl sm:text-4xl font-semibold'>{header}</p>
          <p className='text-lg sm:text-2xl mt-3 sm:mt-5 '>{description}</p>
        </div>

        <TextLink
          text={callToAction.text}
          className='flex flex-row gap-1 items-center uppercase text-base font-bold tracking-wider text-green-550 hover:text-green-500'
          route={callToAction.route}
          underline={false}
          icon={{ Icon: callToAction.icon.Icon, iconStyle: 'mt-1' }}
        />
      </div>
    </div>
  );
};

export default RowCard;
