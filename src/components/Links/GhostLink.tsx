import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface LinkProps {
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
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  isExternal?: boolean;
}

export const GhostLink = (props: LinkProps): React.ReactElement => {
  const { text, className, icon, route, isExternal } = props;
  const { textClr, textHoverClr, borderClr, borderHoverClr } = props.colors;

  const textHoverColor = ` hover:${textHoverClr} `;
  const borderHoverColor = ` hover:${borderHoverClr} `;

  const linkClasses = `table ${textClr} ${textHoverColor}
    border-solid border-2 ${borderClr} ${borderHoverColor}
    p-[4em] py-[0.5em] rounded
   ${className ? className : ''}`;

  return (
    <>
      {!isExternal && (
        <Link to={route} className={linkClasses} onClick={props.onClick}>
          {text}
          {icon ? (
            <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
          ) : (
            ''
          )}
        </Link>
      )}
      {isExternal && (
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
