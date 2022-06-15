// public HomePage - Hero section carousel settings
export const FEATURE_CAROUSEL_SETTINGS = {
  dots: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  customPaging: () => <button className='before:mt-4'></button>,
};

// Testimonial Carousel Settngs
export const TESTIMONIAL_CAROUSEL_SETTINGS = {
  slidesToShow: 6,
  swipeToSlide: true,
  focusOnSelect: true,
  autoplay: true,
  infinite: true,
};
