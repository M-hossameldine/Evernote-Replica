import type { IconType } from 'react-icons';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMediumM,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';

export interface FooterData {
  colTitle: string;
  colFeatures: {
    text: string;
    route: string;
  }[];
}

export const FOOTER_DATA: FooterData[] = [
  {
    colTitle: 'Product',
    colFeatures: [
      {
        text: 'Why Evernote',
        route: '',
      },
      {
        text: 'Evernote Free',
        route: '',
      },
      {
        text: 'Evernote Personal',
        route: '',
      },
      {
        text: 'Evernote Professional',
        route: '',
      },
      {
        text: 'Evernote Teams',
        route: '',
      },
      {
        text: 'Compare Plans',
        route: '',
      },
      {
        text: 'Student Discount',
        route: '',
      },
      {
        text: 'Download App',
        route: '',
      },
    ],
  },
  {
    colTitle: 'Features',
    colFeatures: [
      {
        text: 'Web Clipper',
        route: '',
      },
      {
        text: 'Templates',
        route: '',
      },
      {
        text: 'Spaces',
        route: '',
      },
      {
        text: 'ntegrations',
        route: '',
      },
      {
        text: 'Notes Sync',
        route: '',
      },
      {
        text: 'PDF & Doc Search',
        route: '',
      },
      {
        text: 'Search Handwriting',
        route: '',
      },
      {
        text: 'Document Scanning',
        route: '',
      },
      {
        text: 'Notebooks & Tags',
        route: '',
      },
      {
        text: 'Tasks',
        route: '',
      },
      {
        text: 'Calendar',
        route: '',
      },
      {
        text: 'Home',
        route: '',
      },
      {
        text: 'Search',
        route: '',
      },
    ],
  },
  {
    colTitle: 'Resources',
    colFeatures: [
      {
        text: 'Resources',
        route: '',
      },
      {
        text: 'Make Connections',
        route: '',
      },
      {
        text: 'Become an Expert',
        route: '',
      },
      {
        text: 'Find an Expert',
        route: '',
      },
      {
        text: 'Early Access',
        route: '',
      },
      {
        text: 'Affiliates',
        route: '',
      },
      {
        text: 'Developers',
        route: '',
      },
      {
        text: 'Blog',
        route: '',
      },
    ],
  },
  {
    colTitle: 'Support',
    colFeatures: [
      {
        text: 'Help & Learning',
        route: '',
      },
      {
        text: 'Troubleshooting',
        route: '',
      },
      {
        text: 'Forum',
        route: '',
      },
    ],
  },
  {
    colTitle: 'Company',
    colFeatures: [
      {
        text: 'About Us',
        route: '',
      },
      {
        text: 'Careers',
        route: '',
      },
      {
        text: 'Contact Us',
        route: '',
      },
    ],
  },
];

export const FOOTER_SOCIAL_ICONS_DATA: {
  Icon: IconType;
  route: string;
}[] = [
  {
    Icon: FaFacebookF,
    route: 'https://web.facebook.com/evernote',
  },
  {
    Icon: FaTwitter,
    route: 'https://twitter.com/evernote',
  },
  {
    Icon: FaMediumM,
    route: 'https://medium.com/@evernote',
  },
  {
    Icon: FaInstagram,
    route: 'https://www.instagram.com/evernote',
  },
  {
    Icon: FaYoutube,
    route: 'https://www.youtube.com/channel/UCr_JcNR6slxFcTtDZ8t6F0A',
  },
  {
    Icon: FaLinkedinIn,
    route: 'https://www.linkedin.com/company/evernote/',
  },
];

export const FOOTER_LEGAL_DATA: { text: string; route: string }[] = [
  {
    text: 'Security',
    route: '',
  },
  {
    text: 'Legal',
    route: '',
  },
  {
    text: 'Privacy',
    route: '',
  },
];
