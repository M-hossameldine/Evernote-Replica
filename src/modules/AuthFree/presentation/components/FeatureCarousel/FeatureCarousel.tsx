import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import SimpleFeatureBlock from '../FeatureBlock';

interface FeatureCarouselDataItem {
  title: string;
  description: string;
}

type PropsType = {
  data: FeatureCarouselDataItem[];
  settings: object;
};

export const FeatureCarousel = (props: PropsType): React.ReactElement => {
  const { data, settings } = props;

  return (
    <Slider {...settings}>
      {data.map((feature, index) => (
        <SimpleFeatureBlock
          key={index + feature.title}
          className="text-center"
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
