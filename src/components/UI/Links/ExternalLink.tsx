import { IconType } from 'react-icons';

const ExteranlLink: React.FC<{
  text: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  href: string;
  className?: string;
}> = (props) => {
  const { text, icon, href, className } = props;

  return (
    <a
      target='_blank'
      href={href}
      rel='noopener noreferrer'
      className={className}
    >
      {text}
      {icon ? (
        <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
      ) : (
        ''
      )}
    </a>
  );
};

export default ExteranlLink;
