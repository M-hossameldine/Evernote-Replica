export interface SubmenuFunctionItemProps {
  id: string;
  content: string | JSX.Element;
  onClick: () => void;
}

const SubmenuFunctionItem = (
  props: SubmenuFunctionItemProps
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
