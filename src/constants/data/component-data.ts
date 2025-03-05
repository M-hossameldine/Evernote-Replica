import { v4 as uuid } from 'uuid';

import {
  FeatureCalenderIcon,
  FeatureCalenderImg,
  FeatureClipTheWebImg,
  FeatureDocScanningIcon,
  FeatureHitDeadlineIcon,
  FeatureHitDeadlineImg,
  FeaturePaperlessImg,
  FeatureWebClippingIcon,
} from '../../assets';
import { IoIosArrowForward } from 'react-icons/io';

import type {
  HOME_FEATURE_ZIGZAG_DATA_INTERFACE,
  PRICE_PLAN_DATA_INTERFACE,
} from '../../interfaces';

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
