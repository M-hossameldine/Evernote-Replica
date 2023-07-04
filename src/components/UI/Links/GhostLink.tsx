import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { ExternalLink } from "components";

interface LINK_INTERFACE {
  text: string;
  colors: {
    textClr: string;
    textHoverClr: string;
    borderClr: string;
    borderHoverClr: string;
  };
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  route: string;
  isExteranl?: boolean;
}

const GhostLink = (props: LINK_INTERFACE): React.ReactElement => {
  const { text, className, icon, route, isExteranl } = props;
  const { textClr, textHoverClr, borderClr, borderHoverClr } = props.colors;

  const textHoverColor = ` hover:${textHoverClr} `;
  const borderHoverColor = ` hover:${borderHoverClr} `;

  const linkClasses = `table ${textClr} ${textHoverColor}
    border-solid border-2 ${borderClr} ${borderHoverColor}
    p-[4em] py-[0.5em] rounded
   ${className ? className : ""}`;

  return (
    <>
      {!isExteranl && (
        <Link to={route} className={linkClasses}>
          {text}
          {icon ? (
            <icon.Icon className={icon.iconStyle ? icon.iconStyle : ""} />
          ) : (
            ""
          )}
        </Link>
      )}
      {isExteranl && (
        <ExternalLink
          href={route}
          text={text}
          className={linkClasses}
          icon={icon}
        />
      )}
    </>
  );
};

export default GhostLink;
