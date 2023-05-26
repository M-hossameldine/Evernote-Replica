import { FUNCTION_ITEM_INTERFACE } from "interfaces/submenu-item-interfaces";

const SubmenuFunctionItem: React.FC<FUNCTION_ITEM_INTERFACE> = (props) => {
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
