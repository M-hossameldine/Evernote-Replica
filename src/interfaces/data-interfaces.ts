import type { IconType } from 'react-icons';

export interface REACT_ICON_INTERFACE {
  Icon: IconType;
  iconStyle?: string;
}

/**************************************************/
// Customized Data Interfaces
/**************************************************/

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
