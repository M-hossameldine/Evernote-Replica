import { HeroSection, SimpleFeatureBlock } from '../../components';
import { AUTHPAGE } from '../../constants/routes';
import { TaskHeroImg } from '../../assets';

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
      {/* Hero Row */}
      <div className='wrapper flex flex-row mt-14'>
        <div>
          <img
            src={TaskHeroImg}
            alt='Image contians a loptop and mobile phone that use evernote app'
          />
        </div>

        {/* desktop */}
        <div className='flex flex-col gap-4'>
          <SimpleFeatureBlock
            title={{ text: 'Work Anywhere' }}
            description={{
              text: 'Keep important info handy—your notes sync automatically to all your devices.',
            }}
          />

          <SimpleFeatureBlock
            title={{ text: 'REMEMBER EVERYTHING' }}
            description={{
              text: 'Make notes more useful by adding text, images, audio, scans, PDFs, and documents.',
            }}
          />
          <SimpleFeatureBlock
            title={{ text: 'TURN TO-DO INTO DONE' }}
            description={{
              text: 'Bring your notes, tasks, and schedules together to get things done more easily.',
            }}
          />
          <SimpleFeatureBlock
            title={{ text: 'FIND THINGS FAST' }}
            description={{
              text: 'Get what you need, when you need it with powerful, flexible search capabilities.',
            }}
          />
        </div>

        {/* Mobile */}
      </div>
    </div>
  );
};

export default PublicHomePage;
