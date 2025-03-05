import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface DefaultCarouselProps {
  children?: React.ReactNode;
  settings: object;
  slides: React.ReactElement<any>[];
}

const DefaultCarousel = (props: DefaultCarouselProps): React.ReactElement => {
  const { settings, slides } = props;

  return <Slider {...settings}>{slides}</Slider>;
};

export default DefaultCarousel;
