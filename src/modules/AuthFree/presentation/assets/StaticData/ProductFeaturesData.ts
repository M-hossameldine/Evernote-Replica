import {
  FeatureCalenderIcon,
  FeatureCalenderImg,
  FeatureClipTheWebImg,
  FeatureDocScanningIcon,
  FeatureHitDeadlineIcon,
  FeatureHitDeadlineImg,
  FeaturePaperlessImg,
  FeatureWebClippingIcon,
} from '~assets';
import { IoIosArrowForward } from 'react-icons/io';

// Public Home - Feature Zigzag Section
export const ProductFeaturesData = [
  {
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
