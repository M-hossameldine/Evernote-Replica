import classes from "./Footer.module.css";

import { HorizontalLogo } from "assets";
import { FOOTER_DATA } from "utils/data/footer-data";

import FooterColumn from "./FooterColumn";
import FooterInfoRow from "./FooterInfoRow";

type PropsType = { className: string };
const Footer = (props: PropsType): React.ReactElement => {
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
      <ul className={classes["footer-cols"]}>
        {FOOTER_DATA.map((col) => (
          <FooterColumn
            key={col.colId}
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
