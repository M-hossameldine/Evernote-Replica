import { NavTabModel } from '../../models/UI-Models';

const SideNavTab: React.FC<{
  tab: NavTabModel;
  className?: string;
  iconStyle?: string;
  textStyle?: string;
}> = (props) => {
  const { tab, className, iconStyle, textStyle } = props;

  const tabClasses = `relative flex justify-center lg:justify-start items-center h-9 gap-[6px] lg:pl-5 py-1 hover:bg-neutral-700 cursor-pointer group  ${
    className ? className : ''
  } `;

  const iconsClasses = `${iconStyle ? iconStyle : 'text-lg'}`;

  const textClasses = textStyle ? textStyle : '';
  return (
    <li className={tabClasses}>
      <span className={iconsClasses}>
        <tab.icon />
      </span>
      <span
        className={
          'absolute lg:static top-0 left-[115%] text-sm lg:text-md bg-neutral-800 lg:bg-transparent whitespace-nowrap p-2 px-3 lg:p-0 rounded-md scale-0  lg:scale-100 group-hover:scale-100  transition ease-linear ' +
          textClasses
        }
      >
        {tab.text}
      </span>
    </li>
  );
};

export default SideNavTab;
