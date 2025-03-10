import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface ReactIconLinkProps {
  Icon: IconType;
  route: string;
  size?: string;
  className?: string;
  isExternal?: boolean;
}

export const ReactIconLink = (
  props: ReactIconLinkProps
): React.ReactElement => {
  const { Icon, route, size, className, isExternal } = props;

  const iconContainerClasses = `${className ? className : ''}`;

  const iconClasses = 'text-2xl sm:text-base';
  return (
    <>
      {!isExternal && (
        <Link to={route} className={iconContainerClasses}>
          <Icon size={size} className={iconClasses} />
        </Link>
      )}
      {isExternal && (
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
