import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface TEXT_LINK_INTERFACE {
  text: string;
  route: string;
  underline?: boolean;
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
}

const TextLink: React.FC<TEXT_LINK_INTERFACE> = (props) => {
  const { text, route, underline = true, className, icon } = props;

  let linkClasses = ` text-neutral-700 hover:text-green-550 
      ${className ? className : ''} 
      ${underline ? ' underline ' : ''} `;

  return (
    <Link to={route} className={linkClasses}>
      {text}
      {icon ? (
        <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
      ) : (
        ''
      )}
    </Link>
  );
};

export default TextLink;
