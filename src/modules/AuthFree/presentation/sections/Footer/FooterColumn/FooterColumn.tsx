import { TextLink } from '~components/Links';

interface FooterColumnProps {
  title: string;
  featuresData: { text: string; route: string }[];
  className?: string;
}

export const FooterColumn = (props: FooterColumnProps): React.ReactElement => {
  const { featuresData, title } = props;

  return (
    <li className="mb-10 sm:text-sm">
      <h3 className="mb-6 font-bold uppercase">{title}</h3>
      <ul className="flex flex-col items-start">
        {featuresData.map((feature, index) => (
          <li key={index + feature.text}>
            <TextLink
              className="mb-6 hover:text-green-600"
              underline={false}
              text={feature.text}
              route={feature.route}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default FooterColumn;
