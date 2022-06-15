import {
  SimpleFeatureBlock,
  FeatureCarousel,
  TestimonialCarousel,
} from '../../components';
import { HeroSection, FeatureZigzagSection } from '../../sections/';
import { AUTHPAGE } from '../../constants/routes';
import { TaskHeroImg, VideoModalImg } from '../../assets';
import {
  HOME_BASIC_FEATURE_DATA,
  Testimonial_CAROUSEL_DATA,
  HOME_FEATURE_ZIGZAG_DATA,
} from '../../utils/data';

// carousel settings
const featureCarouselSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  customPaging: () => <button className='before:mt-4'></button>,
};

const PublicHomePage: React.FC = () => {
  return (
    <div className='pb-[40rem]'>
      <HeroSection
        title='Tame your work, organize your life'
        description='Remember everything and tackle any project with your notes, tasks, and schedule all in one place.'
        className='mt-24'
        primeBtn={{
          text: 'Sign up for free',
          route: `${AUTHPAGE}/register`,
          className: 'text-lg ',
        }}
        secondaryBtns={[
          {
            text: 'Already have an account? Log in',
            route: `${AUTHPAGE}/login`,
            className:
              'font-semibold text-lg text-neutral-500 hover:text-green-450',
          },
        ]}
      />

      <div className='wrapper '>
        {/* Hero Row */}
        <div className='block md:flex flex-row items-center mt-14'>
          <div>
            <img
              src={TaskHeroImg}
              alt='Image contians a loptop and mobile phone that use evernote app'
            />
          </div>

          {/* desktop features*/}
          <ul className='w-[15rem] shrink-0 hidden md:flex flex-col gap-4'>
            {HOME_BASIC_FEATURE_DATA.map((feature) => (
              <SimpleFeatureBlock
                key={feature.id}
                title={{
                  text: feature.title,
                  className: 'text-lg font-semibold uppercase pb-2',
                }}
                description={{ text: feature.description }}
              />
            ))}
          </ul>

          {/* Mobile Features carousel*/}
          <ul className='block md:hidden'>
            <FeatureCarousel
              settings={featureCarouselSettings}
              data={HOME_BASIC_FEATURE_DATA}
            />
          </ul>
        </div>

        {/* Video Modal */}
        <div className='text-center mt-32 md:mt-16 mb-16'>
          <h2
            className='text-6xl font-semibold px-8 leading-[150%] mb-3'
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3rem)' }}
          >
            Find your productivity happy place
          </h2>
          <p className='text-lg sm:text-2xl'>
            See what's possible with Evernote
          </p>
          <div
            className='max-w-[60rem] mx-auto'
            style={{ paddingTop: 'clamp(3.5rem, 6vw, 6rem)' }}
          >
            <img
              className='block'
              src={VideoModalImg}
              alt='Clickable image opens video to explain Evernote capabilites'
            />
          </div>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <section className='bg-slate-50'>
        <TestimonialCarousel
          className='wrapper py-16'
          data={Testimonial_CAROUSEL_DATA}
          trackSettings={{
            slidesToShow: 6,
            swipeToSlide: true,
            focusOnSelect: true,
            autoplay: true,
            infinite: true,
          }}
        />
      </section>

      {/* Zigzag Feature Rows */}
      <FeatureZigzagSection
        className='wrapper pb-12'
        dataList={HOME_FEATURE_ZIGZAG_DATA}
      />
    </div>
  );
};

export default PublicHomePage;
