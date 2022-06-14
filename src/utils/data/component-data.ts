import { v4 as uuid } from 'uuid';
import { Testimonial_CAROUSEL_DATA_INTERFACE } from '../../interfaces';

import {
  ForbesLogo,
  IncLogo,
  TheVergeLogo,
  EnterpreneurMagazineLogo,
  BusinessLogo,
  WellPlusGoodLogo,
} from '../../assets';

// Public Home Hero Section - feature data
export const HOME_BASIC_FEATURE_DATA = [
  {
    id: uuid(),
    title: 'Work Anywhere',
    description:
      'Keep important info handy your notes sync automatically to all your devices.',
  },
  {
    id: uuid(),
    title: 'REMEMBER EVERYTHING',
    description:
      'Make notes more useful by adding text, images, audio, scans, PDFs, and documents.',
  },
  {
    id: uuid(),
    title: 'TURN TO-DO INTO DONE',
    description:
      'Bring your notes, tasks, and schedules together to get things done more easily.',
  },
  {
    id: uuid(),
    title: 'FIND THINGS FAST',
    description:
      'Get what you need, when you need it with powerful, flexible search capabilities.',
  },
];

// Logo Carousel - Testimonial Data
export const Testimonial_CAROUSEL_DATA: Testimonial_CAROUSEL_DATA_INTERFACE[] =
  [
    {
      id: uuid(),
      review:
        'Evernote is a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. All you have to do is use it.',
      reviewer: 'Forbes',
      logo: ForbesLogo,
      altText: 'Forbes',
    },
    {
      id: uuid(),
      review:
        'Evernote is a powerful tool for managing your tasks right alongside all of the information you work with every day.',
      reviewer: 'Inc. Magazine',
      logo: IncLogo,
      altText: 'Inc. Magazine',
    },
    {
      id: uuid(),
      review:
        'It feels like there are endless ways to use Evernote… Use it for school, work, life, and beyond.',
      reviewer: 'The Verge',
      logo: TheVergeLogo,
      altText: 'The Verge',
    },
    {
      id: uuid(),
      review:
        'A few years ago, after my computer broke down and I lost all of the notes I had saved to my desktop, I finally decided to embrace the cloud and download Evernote. Since then, I haven’t looked back.',
      reviewer: 'Entrepreneur Magazine',
      logo: EnterpreneurMagazineLogo,
      altText: 'Entrepreneur Magazine',
    },
    {
      id: uuid(),
      review:
        'You can even send emails to Evernote and gather all of the things you need in a single place.',
      reviewer: 'Business.com',
      logo: BusinessLogo,
      altText: 'Business.com',
    },
    {
      id: uuid(),
      review:
        'Consider Evernote to be your go-to hub for not just to-do lists but all of your notes. The organizational possibilities are expansive, and everything syncs across all of your devices that have the app enabled, so you’ll never miss a beat.',
      reviewer: 'Well + Good',
      logo: WellPlusGoodLogo,
      altText: 'Well + Good',
    },
  ];
