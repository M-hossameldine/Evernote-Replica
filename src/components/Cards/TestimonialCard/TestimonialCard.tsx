import { FaQuoteLeft } from 'assets';

// logo and altText are passed only if this card is part of the default carousel
interface TestimonialCardProps {
  review: string;
  reviewer: string;
  logo: string;
  altText: string;
}

const TestimonialCard = (props: TestimonialCardProps): React.ReactElement => {
  const { review, reviewer, logo, altText } = props;
  return (
    <div className="text-center text-lg sm:text-2xl sm:leading-[150%]">
      <FaQuoteLeft className="mx-auto mb-[1.4em] shrink-0 text-lg text-green-600 sm:text-2xl" />
      <p className="mb-[1.8em]">&ldquo;{review}&ldquo;</p>
      <p>— {reviewer}</p>

      {/* logo img will be rendered in moble screen only */}
      <img
        className="mx-auto mt-12 block max-h-[1.8rem] sm:hidden"
        src={logo}
        alt={altText}
      />
    </div>
  );
};

export default TestimonialCard;
