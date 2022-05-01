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

  return (
    <Link
      to={route}
      className={` table text-white bg-green-550 hover:bg-green-450 font-semibold p-[4.5em] py-[0.7em] rounded ${
        className ? className : ''
      }`}
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

export default ContainedLink;
