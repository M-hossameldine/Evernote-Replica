import { NavTabModel } from '~models/UI-Models';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~hooks/redux-hooks';

import { fillNoteEditor, selectNotes, selectTrashNotes } from '~store';

import { HOMEPAGE, NOTESPAGE, TRASHPAGE } from '~constants/routes';

import DropdownList from '~components/Dropdown';

import {
  AiFillHome,
  FaStar,
  FaTrash,
  FaUserFriends,
  IoIosCheckmarkCircle,
  IoIosPaper,
  RiBookletFill,
  RiPriceTagFill,
} from '../../../../../assets';
import SideNavTab from './SideNavTab';

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
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const dispatch = useAppDispatch();

  const activateNotesTabHandler = () => {
    if (notes.length > 0) {
      const { id } = notes[0];
      dispatch(fillNoteEditor({ id }));
      navigate(`${NOTESPAGE}/${notes[0].id}`);
    } else {
      navigate(`${NOTESPAGE}/empty`);
    }
  };

  const navigateTrashHandler = () => {
    if (trashNotes.length > 0) {
      const firstTrashNote = trashNotes[0].id;
      navigate(`${TRASHPAGE}/${firstTrashNote}`);
    } else {
      navigate(`${TRASHPAGE}/empty`);
    }
  };

  return (
    <ul className="flex flex-col">
      <SideNavTab tab={TAB_CONTENT.home} onClick={() => navigate(HOMEPAGE)} />
      <div className="flex flex-col">
        {/* <SideNavTab tab={TAB_CONTENT.shortcuts} /> */}
        <SideNavTab tab={TAB_CONTENT.notes} onClick={activateNotesTabHandler} />
        {/* <SideNavTab tab={TAB_CONTENT.tasks} /> */}
        {/* <SideNavTab tab={TAB_CONTENT.notebooks} className='mt-3' /> */}
        {/* <SideNavTab tab={TAB_CONTENT.tags} /> */}
        {/* <SideNavTab tab={TAB_CONTENT.sharedWithMe} /> */}
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
