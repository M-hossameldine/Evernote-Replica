import { FUNCTION_ITEM_INTERFACE } from "interfaces/submenu-item-interfaces";

const SubmenuFunctionItem = (
  props: FUNCTION_ITEM_INTERFACE,
): React.ReactElement => {
  return (
    <button
      className="flex w-full gap-4 px-4 py-2 font-semibold text-neutral-700 hover:bg-neutral-100"
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default SubmenuFunctionItem;
