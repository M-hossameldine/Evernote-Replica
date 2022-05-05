const ExteranlLink: React.FC<{
  text: string;
  href: string;
  className?: string;
}> = (props) => {
  const { href, className, text } = props;

  return (
    <a
      target='_blank'
      href={href}
      rel='noopener noreferrer'
      className={className}
    >
      {text}
    </a>
  );
};

export default ExteranlLink;
