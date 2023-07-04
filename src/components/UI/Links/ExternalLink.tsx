import type { IconType } from "react-icons";

type PropsType = {
  text?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
    size?: string;
  };
  href: string;
  className?: string;
};

const ExteranlLink = (props: PropsType): React.ReactElement => {
  const { text, icon, href, className } = props;

  return (
    <a
      target="_blank"
      href={href}
      rel="noopener noreferrer"
      className={className}
    >
      {text}
      {icon ? (
        <icon.Icon
          size={icon.size}
          className={icon.iconStyle ? icon.iconStyle : ""}
        />
      ) : (
        ""
      )}
    </a>
  );
};

export default ExteranlLink;
