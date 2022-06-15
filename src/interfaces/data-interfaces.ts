import { REACT_ICON_INTERFACE } from '.';

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
