import { useAddNote } from '~modules/notes/presentation/hooks';

import { AddNoteScreenLoading } from './AddNoteScreenLoading';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const AddNoteWrapper = (props: Props): React.ReactElement => {
  const { className } = props;
  const { addNote, isLoading } = useAddNote();

  return (
    <>
      <button className={className ? className : ''} onClick={addNote}>
        {props.children}
      </button>

      {isLoading && <AddNoteScreenLoading />}
    </>
  );
};

export default AddNoteWrapper;
