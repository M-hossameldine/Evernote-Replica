import { FUNCTION_ITEM_INTERFACE } from "interfaces/submenu-item-interfaces";

const SubmenuFunctionItem = (
  props: FUNCTION_ITEM_INTERFACE
): React.ReactElement => {
  return (
    <button
      className="flex gap-4 text-neutral-700 font-semibold hover:bg-neutral-100 px-4 py-2 w-full"
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default SubmenuFunctionItem;
