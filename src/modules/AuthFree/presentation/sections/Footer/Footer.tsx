import classes from './Footer.module.css';

import FooterColumn from './FooterColumn/FooterColumn';
import FooterInfoRow from './FooterInfoRow/FooterInfoRow';

import { FooterData } from '../../assets/StaticData';
import { HorizontalLogo } from '~assets';

type FooterProps = { className: string };

export const Footer = (props: FooterProps): React.ReactElement => {
  const footerClasses = `pb-20 ${props.className} `;

  return (
    <footer className={footerClasses}>
      {/* logo */}
      <div className="mb-14 border-b-2 border-black pb-14">
        <img
          className="w-[9rem] sm:w-auto"
          src={HorizontalLogo}
          alt="Evernote Logo"
        />
      </div>

      {/* Footer Columns */}
      <ul className={classes['footer-cols']}>
        {FooterData.map((col, index) => (
          <FooterColumn
            key={index + col.colTitle}
            title={col.colTitle}
            featuresData={col.colFeatures}
          />
        ))}
      </ul>

      <FooterInfoRow />
    </footer>
  );
};

export default Footer;
