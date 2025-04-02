import './TestimonialSection.css';

import DefaultCarousel from './DefaultCarousel';
import LogoCarousel from './LogoCarousel';
import TestimonialCard from '~components/Cards/TestimonialCard';

import { TestimonialCarouselData } from '../../assets/StaticData';

const DefaultCarouselSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  customPaging: () => <button className="before:mt-4"></button>,
};

interface ComponentInterface {
  className?: string;
  trackSettings: object;
  viewSettings?: object;
}
export const TestimonialSection = (
  props: ComponentInterface
): React.ReactElement => {
  const { className, trackSettings, viewSettings } = props;

  const carouselSlides = TestimonialCarouselData.map((slide, index) => (
    <TestimonialCard
      key={index + slide.reviewer}
      review={slide.review}
      reviewer={slide.reviewer}
      logo={slide.logo}
      altText={slide.altText}
    />
  ));

  return (
    <div className={className ? className : ''}>
      <div className="hidden sm:block">
        <LogoCarousel
          trackSettings={trackSettings}
          viewSettings={viewSettings}
        />
      </div>
      <div className="sm:hidden">
        <DefaultCarousel
          slides={carouselSlides}
          settings={DefaultCarouselSettings}
        />
      </div>
    </div>
  );
};

export default TestimonialSection;
