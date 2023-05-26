import { NavTabModel } from "models/UI-Models";
import SideNavTab from "./SideNavTab";

const TapDropdown: React.FC<{ tabs: NavTabModel[] }> = (props) => {
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
