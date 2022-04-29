import { FUNCTION_ITEM_INTERFACE } from '../../../interfaces/submenu-item-interfaces';

const SubmenuFunctionItem: React.FC<FUNCTION_ITEM_INTERFACE> = (props) => {
  return (
    <div className='flex justify-between gap-4 py-2'>
      <button
        className='flex gap-4 text-neutral-700 hover:bg-neutral-100 px-4 py-1'
        onClick={props.onClick}
      >
        {props.text}
        {/* <span className='text-neutral-500'> Delete </span> */}
      </button>
    </div>
  );
};

export default SubmenuFunctionItem;
