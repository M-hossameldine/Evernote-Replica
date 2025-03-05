import { v4 as uuid } from 'uuid';

// for each price plan card
export interface PricePlanCardData {
  id: string; // card id
  title: string;
  price: string;
  note: string;
  features: { text: string; id: string }[];
  callToAction: {
    text: string;
    route: string;
  };
}

export const PRICE_PLAN_DATA: PricePlanCardData[] = [
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
