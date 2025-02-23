import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface CONTAINED_LINK_INTERFACE {
  text: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  className?: string;
  route: string;
  isExteranl?: boolean;
}

export const ContainedLink = (
  props: CONTAINED_LINK_INTERFACE
): React.ReactElement => {
  const { text, icon, className, route, isExteranl } = props;

  const linkClasses = ` table text-white bg-green-550 hover:bg-green-450 font-semibold py-[0.7em] rounded 
    ${className ? className : ''}`;

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
          href={route}
          className={linkClasses}
          text={text}
          icon={icon}
        />
      )}
    </>
  );
};

export default ContainedLink;
