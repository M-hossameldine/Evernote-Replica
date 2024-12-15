import { NavTabModel } from "models/UI-Models";
import { ReactElement } from "react";

type SideNavTabProps = {
  tab: NavTabModel;
  className?: string;
  iconStyle?: string;
  textStyle?: string;
  onClick?: () => void;
};

const SideNavTab = (props: SideNavTabProps): ReactElement => {
  const {
    tab,
    className,
    iconStyle,
    textStyle,
    onClick: tabClickHandler,
  } = props;

  const tabClasses = `relative flex justify-center lg:justify-start items-center h-9 gap-[6px] lg:pl-5 py-1 hover:bg-neutral-700 cursor-pointer group w-full  ${
    className ? className : ""
  } `;

  const iconsClasses = `${iconStyle ? iconStyle : "text-lg"}`;

  const textClasses = textStyle ? textStyle : "";
  return (
    <li>
      <button className={tabClasses} onClick={tabClickHandler}>
        <span className={iconsClasses}>
          <tab.icon />
        </span>
        <span
          className={
            "lg:text-md absolute left-[115%] top-0 scale-0 whitespace-nowrap rounded-md bg-neutral-800 p-2 px-3 text-sm transition ease-linear group-hover:scale-100 lg:static lg:scale-100 lg:bg-transparent lg:p-0 " +
            textClasses
          }
        >
          {tab.text}
        </span>
      </button>
    </li>
  );
};

export default SideNavTab;
