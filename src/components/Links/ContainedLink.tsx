import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface ContainedLinkProps {
  text: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  className?: string;
  route: string;
  isExternal?: boolean;
}

export const ContainedLink = (
  props: ContainedLinkProps
): React.ReactElement => {
  const { text, icon, className, route, isExternal } = props;

  const linkClasses = ` table text-white bg-green-550 hover:bg-green-450 font-semibold py-[0.7em] rounded 
    ${className ? className : ''}`;

  return (
    <>
      {!isExternal && (
        <Link to={route} className={linkClasses}>
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
          className={linkClasses}
          text={text}
          icon={icon}
        />
      )}
    </>
  );
};

export default ContainedLink;
