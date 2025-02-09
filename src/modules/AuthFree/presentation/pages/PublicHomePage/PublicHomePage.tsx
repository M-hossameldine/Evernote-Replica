import { SimpleFeatureBlock, TextLink } from "components";
import { FeatureCarousel } from "../../components/FeatureCarousel";
import {
  HeroSection,
  TestimonialSection,
  FeatureZigzagSection,
  PricingPlansSection,
  Footer,
} from "sections/";
import { TaskHeroImg, IoIosArrowRoundForward } from "assets";
import {
  HOME_BASIC_FEATURE_DATA,
  Testimonial_CAROUSEL_DATA,
  HOME_FEATURE_ZIGZAG_DATA,
  PRICE_PLAN_DATA,
} from "utils/data";
import {
  FEATURE_CAROUSEL_SETTINGS,
  TESTIMONIAL_CAROUSEL_SETTINGS,
} from "utils/settings";

import { AuthRouteVariants } from "constants/routeVariants";
import { AuthMode } from "constants/AppEnums/AuthEnums";

const PublicHomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="wrapper mb-32 md:mb-16">
        <HeroSection
          title="Tame your work, organize your life"
          description="Remember everything and tackle any project with your notes, tasks, and schedule all in one place."
          className="mt-24"
          primeBtn={{
            text: "Sign up for free",
            route: AuthRouteVariants.auth.pathname(AuthMode.REGISTER),
            className: "text-lg px-[4.5em]",
          }}
          secondaryBtns={[
            {
              text: "Already have an account? Log in",
              route: AuthRouteVariants.auth.pathname(AuthMode.LOGIN),
              className:
                "font-semibold text-lg text-neutral-500 hover:text-green-450",
            },
          ]}
        />

        {/* Hero Row */}
        <div className="mt-14 block flex-row items-center md:flex">
          <div>
            <img
              src={TaskHeroImg}
              alt="a loptop and mobile phone that use evernote app"
            />
          </div>

          {/* desktop features*/}
          <ul className="hidden w-[15rem] shrink-0 flex-col gap-4 md:flex">
            {HOME_BASIC_FEATURE_DATA.map((feature) => (
              <SimpleFeatureBlock
                key={feature.id}
                title={{
                  text: feature.title,
                  className: "text-lg font-semibold uppercase pb-2",
                }}
                description={{ text: feature.description }}
              />
            ))}
          </ul>

          {/* Mobile Features carousel*/}
          <ul className="block md:hidden">
            <FeatureCarousel
              settings={FEATURE_CAROUSEL_SETTINGS}
              data={HOME_BASIC_FEATURE_DATA}
            />
          </ul>
        </div>
      </div>

      {/* Home Video Modal */}
      {/* <div className='wrapper text-center mb-16'>
        <h2
          className='text-6xl font-semibold px-8 leading-[150%] mb-3'
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3rem)' }}
        >
          Find your productivity happy place
        </h2>
        <p className='text-lg sm:text-2xl'>See what's possible with Evernote</p>
        <div
          className='max-w-[60rem] mx-auto'
          style={{ paddingTop: 'clamp(3.5rem, 6vw, 6rem)' }}
        >
          <VideoModal />
        </div>
      </div> */}

      {/* Testimonial Carousel */}
      <section className="bg-slate-50">
        <TestimonialSection
          className="wrapper py-16"
          data={Testimonial_CAROUSEL_DATA}
          trackSettings={TESTIMONIAL_CAROUSEL_SETTINGS}
        />
      </section>

      {/* Zigzag Feature Rows */}
      <FeatureZigzagSection
        className="wrapper pb-12"
        dataList={HOME_FEATURE_ZIGZAG_DATA}
      />

      {/* Price plans section */}
      <section className="wrapper py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-2xl font-bold md:text-4xl">
            Find you Evernote
          </h2>
          <p className="mb-4 text-xl">
            Whether you want to get organized, keep your personal life on track,
            or boost workplace productivity, Evernote has the right plan for
            you.
          </p>
          <TextLink
            text="Compare Plans"
            route=""
            icon={{
              Icon: IoIosArrowRoundForward,
              iconStyle: "mt-1 text-xl",
            }}
            className="jus mx-auto inline-flex w-auto items-center text-lg font-bold uppercase tracking-wider text-green-600"
            underline={false}
          />
        </div>
        <PricingPlansSection
          data={PRICE_PLAN_DATA}
          className="flex flex-col items-start gap-8 md:flex-row md:gap-6 lg:gap-8"
        />
      </section>

      {/* Footer Section */}
      <Footer className="wrapper" />
    </div>
  );
};

export default PublicHomePage;
