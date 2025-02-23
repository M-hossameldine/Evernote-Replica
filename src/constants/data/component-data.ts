import { v4 as uuid } from 'uuid';

import {
  BusinessLogo,
  EnterpreneurMagazineLogo,
  FeatureCalenderIcon,
  FeatureCalenderImg,
  FeatureClipTheWebImg,
  FeatureDocScanningIcon,
  FeatureHitDeadlineIcon,
  FeatureHitDeadlineImg,
  FeaturePaperlessImg,
  FeatureWebClippingIcon,
  ForbesLogo,
  IncLogo,
  IoIosArrowForward,
  TheVergeLogo,
  WellPlusGoodLogo,
} from '../../assets';
import type {
  HOME_FEATURE_ZIGZAG_DATA_INTERFACE,
  PRICE_PLAN_DATA_INTERFACE,
  REACT_ICON_INTERFACE,
  Testimonial_CAROUSEL_DATA_INTERFACE,
} from '../../interfaces';

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

// interface HOME_FEATURE_ZIGZAG_DATA_INTERFACE {
//   id: string;
//   header: string;
//   description: string;
//   cardImg: {
//     img: string;
//     altText: string;
//   };
//   cardIcon: {
//     img: string;
//     altText: string;
//   };
//   callToAction: {
//     text: string;
//     route: string;
//     icon: REACT_ICON_INTERFACE;
//   };
// }

// Public Home - Feature Zigzag Section
export const HOME_FEATURE_ZIGZAG_DATA: HOME_FEATURE_ZIGZAG_DATA_INTERFACE[] = [
  {
    id: uuid(),
    header: 'Hit every deadline',
    description:
      'Create and assign tasks inside your notes with due dates, flags, and reminders so nothing falls through the cracks.',
    cardImg: {
      img: FeatureHitDeadlineImg,
      altText: 'Image of task within a note',
    },
    cardIcon: {
      img: FeatureHitDeadlineIcon,
      altText: 'Small image of a task list',
    },
    callToAction: {
      text: 'Learn more',
      route: '',
      icon: {
        Icon: IoIosArrowForward,
      },
    },
  },
  {
    id: uuid(),
    header: 'Go paperless',
    description:
      'Scan important documents and keep them handy on all your devices. Save the information—not the clutter.',
    cardImg: {
      img: FeaturePaperlessImg,
      altText: 'Image of document scan on mobile and desktop',
    },
    cardIcon: {
      img: FeatureDocScanningIcon,
      altText: 'Small Image icon of scanner',
    },
    callToAction: {
      text: 'Learn more',
      route: '',
      icon: {
        Icon: IoIosArrowForward,
      },
    },
  },
  {
    id: uuid(),
    header: 'Clip the web',
    description:
      'Save web pages (without the ads) and mark them up with arrows, highlights, and text to make them more useful.',
    cardImg: {
      img: FeatureClipTheWebImg,
      altText: 'Image of web clipping on mobile and desktop',
    },
    cardIcon: {
      img: FeatureWebClippingIcon,
      altText: 'Small image icon',
    },
    callToAction: {
      text: 'Learn more',
      route: '',
      icon: {
        Icon: IoIosArrowForward,
      },
    },
  },
  {
    id: uuid(),
    header: 'Connect your Google Calendar',
    description:
      'Make your schedule work for you. Your meetings and notes have context so nothing gets lost in the shuffle.',
    cardImg: {
      img: FeatureCalenderImg,
      altText: 'Image of connected calendar widget on Home',
    },
    cardIcon: {
      img: FeatureCalenderIcon,
      altText: 'Small image icon of green calender',
    },
    callToAction: {
      text: 'Learn more',
      route: '',
      icon: {
        Icon: IoIosArrowForward,
      },
    },
  },
];

export const PRICE_PLAN_DATA: PRICE_PLAN_DATA_INTERFACE[] = [
  {
    id: uuid(),
    title: 'Free',
    price: '0',
    note: 'Capture ideas and find them quickly',
    features: [
      {
        id: uuid(),
        text: 'Sync up to 2 devices',
      },
      {
        id: uuid(),
        text: '60 MB monthly uploads',
      },
      {
        id: uuid(),
        text: '25 MB max. note size',
      },
      {
        id: uuid(),
        text: 'Get organized with Home dashboard and 3 widgets',
      },
      {
        id: uuid(),
        text: 'Find things fast with search and tags',
      },
      {
        id: uuid(),
        text: 'Clip web pages',
      },
      {
        id: uuid(),
        text: 'Attach PDFs, receipts, files, photos, images, and documents',
      },
    ],
    callToAction: {
      text: 'Get started',
      route: '',
    },
  },
  {
    id: uuid(),
    title: 'PERSONAL',
    price: '7.99',
    note: 'Keep home and family on track',
    features: [
      {
        id: uuid(),
        text: 'EVERYTHING IN FREE, PLUS:',
      },
      {
        id: uuid(),
        text: 'Sync unlimited devices ',
      },
      {
        id: uuid(),
        text: '10 GB monthly uploads',
      },
      {
        id: uuid(),
        text: '200 MB max. note size',
      },
      {
        id: uuid(),
        text: 'Customize Home dashboard and access extra widgets',
      },
      {
        id: uuid(),
        text: 'Connect primary Google Calendar account',
      },
      {
        id: uuid(),
        text: 'Add due dates, reminders, and notifications to your tasks',
      },
      {
        id: uuid(),
        text: 'Manage tasks in one place',
      },
      {
        id: uuid(),
        text: 'Get offline access on mobile and desktop ',
      },
      {
        id: uuid(),
        text: 'Search text inside images, docs, and PDFs ',
      },
      {
        id: uuid(),
        text: 'Create custom templates ',
      },
      {
        id: uuid(),
        text: 'Mark up images and PDFs',
      },
    ],
    callToAction: {
      text: 'Choose Personal',
      route: '',
    },
  },
  {
    id: uuid(),
    title: 'PROFESSIONAL',
    price: '9.99',
    note: 'Tackle any project, at work or at home',
    features: [
      {
        id: uuid(),
        text: 'EVERYTHING IN PERSONAL, PLUS:',
      },
      {
        id: uuid(),
        text: 'Save 2x more content with 20 GB monthly uploads',
      },
      {
        id: uuid(),
        text: 'Access to all widgets and customization for Home',
      },
      {
        id: uuid(),
        text: 'Connect both personal and workplace Google Calendar accounts',
      },
      {
        id: uuid(),
        text: 'Create, manage, and assign tasks to others, and easily track their progress',
      },
      {
        id: uuid(),
        text: 'Use Boolean terms to refine search results',
      },
      {
        id: uuid(),
        text: 'Find content by location with geographic search',
      },
      {
        id: uuid(),
        text: 'Export notebooks as PDF files',
      },
      {
        id: uuid(),
        text: 'Integrate with Slack, Salesforce, Microsoft Teams, and others',
      },
    ],
    callToAction: {
      text: 'Choose Professional',
      route: '',
    },
  },
];
