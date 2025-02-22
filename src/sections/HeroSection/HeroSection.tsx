import { v4 as uuid } from 'uuid';

import { TextLink, ContainedLink } from 'components/Links';
import { StyledHeroSectionTitle } from './HeroSection.styled';
interface HERO_INTERFACE {
  title: string;
  description: string;
  className?: string;
  primeBtn: {
    text: string;
    route: string;
    isExteranl?: boolean;
    className?: string;
  };
  secondaryBtns?: {
    text: string;
    route: string;
    className?: string;
  }[];
}

const HeroSection = (props: HERO_INTERFACE): React.ReactElement => {
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
        isExteranl={primeBtn.isExteranl}
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
