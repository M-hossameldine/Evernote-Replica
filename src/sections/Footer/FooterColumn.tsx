import { TextLink } from "components";

interface FOOTER_COLUMN_INTERFACE {
  title: string;
  featuresData: { id: string; text: string; route: string }[];
  className?: string;
}

const FooterColumn = (props: FOOTER_COLUMN_INTERFACE): React.ReactElement => {
  const { featuresData, title } = props;

  return (
    <li className="sm:text-sm mb-10">
      <h3 className="uppercase font-bold mb-6">{title}</h3>
      <ul className="flex flex-col items-start">
        {featuresData.map((feature) => (
          <li key={feature.id}>
            <TextLink
              className=" hover:text-green-600 mb-6"
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
