import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

import { ExternalLink } from '../../index';

interface REACT_ICON_LINK_INTERFACE {
  Icon: IconType;
  route: string;
  size?: string;
  className?: string;
  isExteranl?: boolean;
}

const ReactIconLink: React.FC<REACT_ICON_LINK_INTERFACE> = (props) => {
  const { Icon, route, size, className, isExteranl } = props;

  const iconContainerClasses = `${className ? className : ''}`;

  const iconClasses = 'text-2xl sm:text-base';
  return (
    <>
      {!isExteranl && (
        <Link to={route} className={iconContainerClasses}>
          <Icon size={size} className={iconClasses} />
        </Link>
      )}
      {isExteranl && (
        <ExternalLink
          href={route}
          className={iconClasses}
          icon={{ Icon, iconStyle: iconClasses, size }}
        />
      )}
    </>
  );
};

export default ReactIconLink;
