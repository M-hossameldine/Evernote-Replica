import { NavTabModel } from '../../models/UI-Models';
const SideNavTab: React.FC<{
  tab: NavTabModel;
  className?: string;
  iconStyle?: string;
}> = (props) => {
  const { tab, className, iconStyle } = props;

  const tabClasses = `flex items-center gap-[6px] pl-5 py-1 hover:bg-neutral-700 cursor-pointer ${
    className ? className : ''
  } `;
  const iconsClasses = `${iconStyle ? iconStyle : 'text-lg'}`;
  return (
    <li className={tabClasses}>
      <tab.icon className={iconsClasses} />
      {tab.text}
    </li>
  );
};

export default SideNavTab;
