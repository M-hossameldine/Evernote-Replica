import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface LINK_INTERFACE {
  text: string;
  route: string;
  textColor: { color: string; hoverColor: string };
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
}

const GhostLink: React.FC<LINK_INTERFACE> = (props) => {
  const { text, route, textColor, className, icon } = props;

  let colorValue = textColor.color.replace('text-', '');
  let hoverColorValue = textColor.hoverColor.replace('text-', '');

  let clrClasses = ` border-${colorValue} hover:border-${hoverColorValue} `;
  // border-${colorValue} hover:border-${hoverColorValue}
  return (
    <Link
      to={route}
      className={`table text-${colorValue} hover:text-${hoverColorValue}
        border-2 ${clrClasses} p-[4em] py-[0.5em] rounded
        ${className ? className : ''}`}
    >
      {text}
      {icon ? (
        <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
      ) : (
        ''
      )}
    </Link>
  );
};

export default GhostLink;
