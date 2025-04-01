import { useMatch } from 'react-router-dom';

import { BiFilterAlt } from 'react-icons/bi';
import { BsSortDown } from 'react-icons/bs';
import { MdViewList } from 'react-icons/md';

import { NotesRouteVariants } from '~constants';

const NoteListingOptions: React.FC = () => {
  const isInTrashNotes = useMatch(NotesRouteVariants.trashNotes.route);

  return (
    <div className="flex gap-2">
      <BsSortDown size="22" className="shrink-0 cursor-pointer" />
      {!isInTrashNotes && (
        <BiFilterAlt size="22" className="shrink-0 cursor-pointer" />
      )}
      <MdViewList size="22" className="shrink-0 cursor-pointer" />
    </div>
  );
};

export default NoteListingOptions;
