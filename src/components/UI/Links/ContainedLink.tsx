import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

import { ExternalLink } from '../../index';

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

const ContainedLink: React.FC<CONTAINED_LINK_INTERFACE> = (props) => {
  const { text, icon, className, route, isExteranl } = props;

  const linkClasses = ` table text-white bg-green-550 hover:bg-green-450 font-semibold p-[4.5em] py-[0.7em] rounded 
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
