import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

import { ExternalLink } from '../../index';

interface TEXT_LINK_INTERFACE {
  text: string;
  underline?: boolean;
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  route: string;
  isExteranl?: boolean; // to define if the link will navigate to internal destination inside our app or exteranl destination
}

const TextLink: React.FC<TEXT_LINK_INTERFACE> = (props) => {
  const { text, route, underline = true, className, icon, isExteranl } = props;

  let linkClasses = ` 
      flex items-center gap-1
      ${className ? className : ''} 
      ${underline ? ' underline ' : ''} `;

  return (
    <>
      {!isExteranl && (
        <Link to={route} className={linkClasses}>
          {text}
          {icon ? (
            <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
          ) : (
            ''
          )}
        </Link>
      )}
      {isExteranl && (
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
