import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

interface CONTAINED_LINK_INTERFACE {
  text: string;
  route: string;
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
}

const ContainedLink: React.FC<CONTAINED_LINK_INTERFACE> = (props) => {
  const { text, route, className, icon } = props;

  const linkClasses =
    `text-white bg-green-550 hover:bg-green-600 font-semibold py-[1em] px-[4em] rounded ` +
    className
      ? className
      : '';

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
  // return <Link to={route} className=''> {text} </Link>;
};

export default ContainedLink;
