import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector, fillNoteEditor } from '~store';
import { selectActiveNotes, selectTrashNotes } from '~modules/notes/data/local';

import DropdownList from '~components/Dropdown';
import SideNavTab from './SideNavTab';
import { NavTabModel } from '~models/UI-Models';

import { RiPriceTagFill, RiBookletFill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends, FaTrash, FaStar } from 'react-icons/fa';
import { IoIosCheckmarkCircle, IoIosPaper } from 'react-icons/io';

import { CommonRouteVariants, NotesRouteVariants } from '~constants';

const TAB_CONTENT = {
  home: new NavTabModel('Home', AiFillHome),
  shortcuts: new NavTabModel('Shortcuts', FaStar),
  notes: new NavTabModel('Notes', IoIosPaper),
  tasks: new NavTabModel('Tasks', IoIosCheckmarkCircle),
  notebooks: new NavTabModel('Notebooks', RiBookletFill),
  tags: new NavTabModel('Tags', RiPriceTagFill),
  sharedWithMe: new NavTabModel('Shared with me', FaUserFriends),
  trash: new NavTabModel('Trash', FaTrash),
};

export const SideNavTabs: React.FC = () => {
  const navigate = useNavigate();
  const notes = useAppSelector(selectActiveNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const dispatch = useAppDispatch();

  const activateNotesTabHandler = () => {
    if (notes?.length > 0) {
      const { id } = notes[0];
      dispatch(fillNoteEditor());
      navigate(NotesRouteVariants.notes.pathname(id));
    } else {
      navigate(NotesRouteVariants.notes.pathname('empty'));
    }
  };

  const navigateTrashHandler = () => {
    if (trashNotes?.length > 0) {
      const firstTrashNote = trashNotes[0].id;
      navigate(NotesRouteVariants.trashNotes.pathname(firstTrashNote));
    } else {
      navigate(NotesRouteVariants.trashNotes.pathname('empty'));
    }
  };

  return (
    <ul className="flex flex-col">
      <SideNavTab
        tab={TAB_CONTENT.home}
        onClick={() => navigate(CommonRouteVariants.userHomePage.pathname())}
      />
      <div className="flex flex-col">
        <SideNavTab tab={TAB_CONTENT.notes} onClick={activateNotesTabHandler} />
        <SideNavTab
          tab={TAB_CONTENT.trash}
          className="mt-3"
          onClick={navigateTrashHandler}
        />
      </div>
      <DropdownList />
    </ul>
  );
};

export default SideNavTabs;
