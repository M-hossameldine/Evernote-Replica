import { TextLink } from '~components/Links';

interface FOOTER_COLUMN_INTERFACE {
  title: string;
  featuresData: { id: string; text: string; route: string }[];
  className?: string;
}

const FooterColumn = (props: FOOTER_COLUMN_INTERFACE): React.ReactElement => {
  const { featuresData, title } = props;

  return (
    <li className="mb-10 sm:text-sm">
      <h3 className="mb-6 font-bold uppercase">{title}</h3>
      <ul className="flex flex-col items-start">
        {featuresData.map(feature => (
          <li key={feature.id}>
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
