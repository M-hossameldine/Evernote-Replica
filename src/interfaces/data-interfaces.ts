import type { IconType } from 'react-icons';

import type { REACT_ICON_INTERFACE } from '.';

/**************************************************/
// General Data Interfaces
/**************************************************/

export interface ICON_LINK_DATA_INTERFACE {
  id: string;
  Icon: IconType;
  route: string;
}

/**************************************************/
// Customized Data Interfaces
/**************************************************/

export interface Testimonial_CAROUSEL_DATA_INTERFACE {
  id: string;
  reviewer: string;
  review: string;
  logo: string;
  altText: string;
}

export interface HOME_FEATURE_ZIGZAG_DATA_INTERFACE {
  id: string;
  header: string;
  description: string;
  cardImg: {
    img: string;
    altText: string;
  };
  cardIcon: {
    img: string;
    altText: string;
  };
  callToAction: {
    text: string;
    route: string;
    icon: REACT_ICON_INTERFACE;
  };
}

// for each price plan card
export interface PRICE_PLAN_DATA_INTERFACE {
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
