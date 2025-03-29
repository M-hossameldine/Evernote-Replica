type NoteActionsDropdownItemProps = {
  text: string;
  toggleDropdown: () => void;
  onClick?: () => void;
};

const NoteActionsDropdownItem = (
  props: NoteActionsDropdownItemProps
): React.ReactElement => {
  const { text, toggleDropdown, onClick } = props;

  const itemActionHandler = () => {
    toggleDropdown();
    onClick?.();
  };

  return (
    <div className="flex justify-between gap-4 py-2">
      <button
        className="flex gap-4 px-4 py-1 text-neutral-700 hover:bg-neutral-100"
        onClick={itemActionHandler}
      >
        {text}
      </button>
    </div>
  );
};

export default NoteActionsDropdownItem;
