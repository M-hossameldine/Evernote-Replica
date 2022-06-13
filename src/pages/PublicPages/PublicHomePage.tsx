import { HeroSection, SimpleFeatureBlock } from '../../components';
import { AUTHPAGE } from '../../constants/routes';
import { TaskHeroImg, VideoModalImg } from '../../assets';
import { HOME_BASIC_FEATURE_DATA } from '../../utils/data';

const PublicHomePage: React.FC = () => {
  return (
    <div className=''>
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
        <div className='flex flex-row mt-14'>
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
                title={{ text: feature.title }}
                description={{ text: feature.description }}
              />
            ))}
          </ul>
          {/* Mobile */}
        </div>

        {/* Video Modal */}
        <div className='text-center mt-12'>
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
    </div>
  );
};

export default PublicHomePage;
