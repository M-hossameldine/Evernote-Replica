import { v4 as uuid } from 'uuid';

import { ContainedLink, TextLink } from '~components/Links';

import { StyledHeroSectionTitle } from './HeroSection.styled';

interface HeroSectionProps {
  title: string;
  description: string;
  className?: string;
  primeBtn: {
    text: string;
    route: string;
    isExternal?: boolean;
    className?: string;
  };
  secondaryBtns?: {
    text: string;
    route: string;
    className?: string;
  }[];
}

export const HeroSection = (props: HeroSectionProps): React.ReactElement => {
  const { title, description, className, primeBtn, secondaryBtns } = props;

  return (
    <section
      className={`container mx-auto max-w-[75rem] px-4 text-center md:px-12 lg:px-24 ${
        className ? className : ''
      } `}
    >
      <StyledHeroSectionTitle className="mb-2 mt-4 font-bold leading-[150%]">
        {title}
      </StyledHeroSectionTitle>
      <h5 className="mb-8 text-2xl">{description}</h5>

      {/* call to main action */}
      <ContainedLink
        route={primeBtn.route}
        text={primeBtn.text}
        className={`mx-auto mb-4 ${primeBtn.className ? primeBtn.className : ''}`}
        isExternal={primeBtn.isExternal}
      />

      {/* optional call to extra actions */}
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {!!secondaryBtns &&
          secondaryBtns.map(btn => (
            <li key={uuid()}>
              <TextLink
                text={btn.text}
                route={btn.route}
                className={btn.className ? btn.className : ''}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default HeroSection;
