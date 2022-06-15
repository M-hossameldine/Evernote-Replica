import { useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { TestimonialCard } from '../../../';
import { Testimonial_CAROUSEL_DATA_INTERFACE } from '../../../../interfaces';

const LogoCarousel: React.FC<{
  className?: string;
  data: Testimonial_CAROUSEL_DATA_INTERFACE[];
  trackSettings: {};
  viewSettings?: {};
}> = (props) => {
  const { className, data, trackSettings, viewSettings } = props;
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  return (
    <div className={className ? className : ''}>
      {/* View Slider */}
      <div className='max-w-[925px] mx-auto text-center'>
        <Slider asNavFor={nav2!} ref={(slider1) => setNav1(slider1)}>
          {data.map((testimonial) => (
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
      <div className='testimonial-carousel__logo-track'>
        <Slider
          asNavFor={nav1!}
          ref={(slider2) => setNav2(slider2)}
          {...trackSettings}
        >
          {data.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`logo !block max-w-[150px] w-full max-h-full mx-auto cursor-pointer px-[1vw]`}
            >
              <img
                className='block mx-auto w-full'
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
