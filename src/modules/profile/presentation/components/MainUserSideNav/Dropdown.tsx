import { NavTabModel } from "models/UI-Models";
import SideNavTab from "./SideNavTab";

interface PropsType {
  tabs: NavTabModel[];
}

const TapDropdown = (props: PropsType): React.ReactElement => {
  const { tabs } = props;

  return (
    <ul>
      {tabs.map((tab) => (
        <SideNavTab key={tab.id} tab={tab} />
      ))}
    </ul>
  );
};

export default TapDropdown;
