import { RiHomeGearFill } from '~assets';

import { StyledHomePrivateHeader } from './HomePrivateHeader.styled';

export const HomePrivateHeader: React.FC = () => {
  // get home header date
  const todayTimestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
  });

  // define proper greeting according to the day time
  const hour = new Date().getHours();

  let greeting = 'morning';
  if ((hour >= 12 && hour <= 23) || (hour >= 0 && hour <= 3)) {
    greeting = hour >= 12 && hour <= 16 ? 'afternoon' : 'evening';
  }

  return (
    <StyledHomePrivateHeader className="h-[28rem] bg-cover bg-center bg-no-repeat px-6 py-4">
      <nav className="flex items-center justify-evenly gap-4 text-neutral-100">
        <p className="text-xl">Good {greeting}!</p>
        <small className="ml-auto uppercase"> {todayTimestamp}</small>
        <button className="flex items-center gap-1 rounded bg-neutral-100 px-2 py-1 text-neutral-800">
          <RiHomeGearFill size="20" className="shrink-0" />
          <span className="hidden text-sm md:block">Customize</span>
        </button>
      </nav>
    </StyledHomePrivateHeader>
  );
};

export default HomePrivateHeader;
