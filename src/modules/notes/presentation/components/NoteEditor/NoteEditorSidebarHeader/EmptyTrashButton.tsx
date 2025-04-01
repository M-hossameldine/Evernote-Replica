import { useClearTrashNotesMutation } from '~modules/notes/data/remote';

const EmptyTrashButton: React.FC = () => {
  const [clearTrashNotes] = useClearTrashNotesMutation();

  const emptyTrashHandler = () => {
    clearTrashNotes({});
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
