import { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import TestimonialCard from '~components/Cards/TestimonialCard';

import { Testimonial_CAROUSEL_DATA } from '~constants/data';

interface LogoCarouselProps {
  className?: string;
  trackSettings: object;
  viewSettings?: object;
}

const LogoCarousel = (props: LogoCarouselProps): React.ReactElement => {
  const { className, trackSettings } = props;
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  return (
    <div className={className ? className : ''}>
      {/* View Slider */}
      <div className="mx-auto max-w-[925px] text-center">
        <Slider asNavFor={nav2!} ref={slider1 => setNav1(slider1)}>
          {Testimonial_CAROUSEL_DATA.map((testimonial, index) => (
            <TestimonialCard
              key={index + testimonial.reviewer}
              review={testimonial.review}
              reviewer={testimonial.reviewer}
              logo={testimonial.logo}
              altText={testimonial.altText}
            />
          ))}
        </Slider>
      </div>
      {/* Logo Track Slider */}
      <div className="testimonial-carousel__logo-track">
        <Slider
          asNavFor={nav1!}
          ref={slider2 => setNav2(slider2)}
          {...trackSettings}
        >
          {Testimonial_CAROUSEL_DATA.map((testimonial, index) => (
            <div
              key={index + testimonial.altText}
              className={`logo mx-auto !block max-h-full w-full max-w-[150px] cursor-pointer px-[1vw]`}
            >
              <img
                className="mx-auto block w-full"
                src={testimonial.logo}
                alt={testimonial.altText}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LogoCarousel;
