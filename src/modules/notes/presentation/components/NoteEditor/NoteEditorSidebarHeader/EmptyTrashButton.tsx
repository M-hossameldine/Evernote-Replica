import { useEmptyTrashMutation } from '~modules/notes/data/remote';

const EmptyTrashButton: React.FC = () => {
  const [emptyTrash] = useEmptyTrashMutation();

  const emptyTrashHandler = () => {
    emptyTrash({});
  };

  return (
    <button
      className="ml-auto rounded bg-neutral-300 px-3 py-1 text-sm text-white"
      onClick={emptyTrashHandler}
    >
      Empty Trash
    </button>
  );
};

export default EmptyTrashButton;
