import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface TextLinkProps {
  text: string;
  underline?: boolean;
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  route: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  isExternal?: boolean; // to define if the link will navigate to internal destination inside our app or external destination
}

export const TextLink = (props: TextLinkProps): React.ReactElement => {
  const { text, route, underline = true, className, icon, isExternal } = props;

  const linkClasses = ` 
      flex items-center gap-1
      ${className ? className : ''} 
      ${underline ? ' underline ' : ''} `;

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
          text={text}
          icon={icon}
          href={route}
          className={linkClasses}
        />
      )}
    </>
  );
};

export default TextLink;
