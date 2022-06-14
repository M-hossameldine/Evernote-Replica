import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface DefaultCarouselProps {
  children?: React.ReactNode;
  settings: {};
  slides: React.ReactElement<any>[];
}

const DefaultCarousel: React.FC<DefaultCarouselProps> = (props) => {
  const { children, settings, slides } = props;

  return <Slider {...settings}>{slides}</Slider>;
};

export default DefaultCarousel;
