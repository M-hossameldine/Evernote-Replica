// for each price plan card
export interface PricePlanCardData {
  title: string;
  price: string;
  note: string;
  features: { text: string }[];
  callToAction: {
    text: string;
    route: string;
  };
}

export const PricePlanData: PricePlanCardData[] = [
  {
    title: 'Free',
    price: '0',
    note: 'Capture ideas and find them quickly',
    features: [
      {
        text: 'Sync up to 2 devices',
      },
      {
        text: '60 MB monthly uploads',
      },
      {
        text: '25 MB max. note size',
      },
      {
        text: 'Get organized with Home dashboard and 3 widgets',
      },
      {
        text: 'Find things fast with search and tags',
      },
      {
        text: 'Clip web pages',
      },
      {
        text: 'Attach PDFs, receipts, files, photos, images, and documents',
      },
    ],
    callToAction: {
      text: 'Get started',
      route: '',
    },
  },
  {
    title: 'PERSONAL',
    price: '7.99',
    note: 'Keep home and family on track',
    features: [
      {
        text: 'EVERYTHING IN FREE, PLUS:',
      },
      {
        text: 'Sync unlimited devices ',
      },
      {
        text: '10 GB monthly uploads',
      },
      {
        text: '200 MB max. note size',
      },
      {
        text: 'Customize Home dashboard and access extra widgets',
      },
      {
        text: 'Connect primary Google Calendar account',
      },
      {
        text: 'Add due dates, reminders, and notifications to your tasks',
      },
      {
        text: 'Manage tasks in one place',
      },
      {
        text: 'Get offline access on mobile and desktop ',
      },
      {
        text: 'Search text inside images, docs, and PDFs ',
      },
      {
        text: 'Create custom templates ',
      },
      {
        text: 'Mark up images and PDFs',
      },
    ],
    callToAction: {
      text: 'Choose Personal',
      route: '',
    },
  },
  {
    title: 'PROFESSIONAL',
    price: '9.99',
    note: 'Tackle any project, at work or at home',
    features: [
      {
        text: 'EVERYTHING IN PERSONAL, PLUS:',
      },
      {
        text: 'Save 2x more content with 20 GB monthly uploads',
      },
      {
        text: 'Access to all widgets and customization for Home',
      },
      {
        text: 'Connect both personal and workplace Google Calendar accounts',
      },
      {
        text: 'Create, manage, and assign tasks to others, and easily track their progress',
      },
      {
        text: 'Use Boolean terms to refine search results',
      },
      {
        text: 'Find content by location with geographic search',
      },
      {
        text: 'Export notebooks as PDF files',
      },
      {
        text: 'Integrate with Slack, Salesforce, Microsoft Teams, and others',
      },
    ],
    callToAction: {
      text: 'Choose Professional',
      route: '',
    },
  },
];
