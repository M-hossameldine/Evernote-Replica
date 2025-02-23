import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import SimpleFeatureBlock from '../FeatureBlock';

interface DATA_INTERFACE {
  id: string;
  title: string;
  description: string;
}

type PropsType = {
  data: DATA_INTERFACE[];
  settings: object;
};

export const FeatureCarousel = (props: PropsType): React.ReactElement => {
  const { data, settings } = props;

  return (
    <Slider {...settings}>
      {data.map(feature => (
        <SimpleFeatureBlock
          key={feature.id}
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
