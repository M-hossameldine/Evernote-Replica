import './index.css';

import { TestimonialCard, LogoCarousel, DefaultCarousel } from 'components';
import { Testimonial_CAROUSEL_DATA } from 'utils/data';
import { Testimonial_CAROUSEL_DATA_INTERFACE } from 'interfaces';

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
  data: Testimonial_CAROUSEL_DATA_INTERFACE[];
  trackSettings: object;
  viewSettings?: object;
}
const TestimonialSection = (props: ComponentInterface): React.ReactElement => {
  const { className, data, trackSettings, viewSettings } = props;

  const carouselSlides = Testimonial_CAROUSEL_DATA.map(slide => (
    <TestimonialCard
      key={slide.id}
      review={slide.review}
      reviewer={slide.reviewer}
      logo={slide.logo}
      altText={slide.altText}
    />
  ));

  return (
    <>
      <div className={className ? className : ''}>
        <div className="hidden sm:block">
          <LogoCarousel
            data={data}
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
    </>
  );
};

export default TestimonialSection;
