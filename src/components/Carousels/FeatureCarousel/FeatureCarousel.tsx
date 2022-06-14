import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { SimpleFeatureBlock } from '../..';

interface DATA_INTERFACE {
  id: string;
  title: string;
  description: string;
}

const FeatureCarousel: React.FC<{ data: DATA_INTERFACE[]; settings: {} }> = (
  props
) => {
  const { data, settings } = props;

  return (
    <Slider {...settings}>
      {data.map((feature) => (
        <SimpleFeatureBlock
          key={feature.id}
          className='text-center'
          title={{
            text: feature.title,
            className: 'text-xl font-semibold uppercase pb-2',
          }}
          description={{ text: feature.description }}
        />
      ))}
    </Slider>
  );
};

export default FeatureCarousel;
