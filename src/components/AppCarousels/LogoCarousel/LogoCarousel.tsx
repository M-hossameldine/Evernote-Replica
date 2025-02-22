import { useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TestimonialCard from 'components/Cards/TestimonialCard';
import type { Testimonial_CAROUSEL_DATA_INTERFACE } from 'interfaces';

interface PropsType {
  className?: string;
  data: Testimonial_CAROUSEL_DATA_INTERFACE[];
  trackSettings: object;
  viewSettings?: object;
}

const LogoCarousel = (props: PropsType): React.ReactElement => {
  const { className, data, trackSettings } = props;
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  return (
    <div className={className ? className : ''}>
      {/* View Slider */}
      <div className="mx-auto max-w-[925px] text-center">
        <Slider asNavFor={nav2!} ref={slider1 => setNav1(slider1)}>
          {data.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
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
          {data.map(testimonial => (
            <div
              key={testimonial.id}
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
