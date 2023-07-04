import { v4 as uuid } from "uuid";

import { TextLink, ContainedLink } from "components";

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
      className={`px-4 md:px-12 lg:px-24 container max-w-[75rem] mx-auto  text-center ${
        className ? className : ""
      } `}
    >
      <h1
        className="font-bold leading-[150%] mb-2 mt-4"
        style={{ fontSize: "clamp(2.2rem, 7vw, 3.5rem)", lineHeight: "" }}
      >
        {title}
      </h1>
      <h5 className="text-2xl mb-8">{description}</h5>

      {/* call to main action */}
      <ContainedLink
        route={primeBtn.route}
        text={primeBtn.text}
        className={`mx-auto mb-4 
          ${primeBtn.className ? primeBtn.className : ""}`}
        isExteranl={primeBtn.isExteranl}
      />

      {/* optional call to extra actions */}
      <ul className="flex justify-center flex-wrap gap-x-6 gap-y-2">
        {!!secondaryBtns &&
          secondaryBtns.map((btn) => (
            <li key={uuid()}>
              <TextLink
                text={btn.text}
                route={btn.route}
                className={btn.className ? btn.className : ""}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default HeroSection;
