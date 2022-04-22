import { useNavigate } from 'react-router-dom';
import { HOMEPAGE, NOTESPAGE, TRASHPAGE } from '../../constants/routes';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { NavTabModel } from '../../models/UI-Models';
import { fillNoteEditor } from '../../store/noteEditor-slice/noteEditor-slice';
import { selectNotes } from '../../store/notes-slice/notes-slice';
import { selectTrashNotes } from '../../store/trash-slice/trash-slice';

import SideNavTab from './SideNavTab';
import DropdownList from '../UI/Dropdown';
import Icons from '../../constants/Icons';

const {
  AiFillHome,
  FaStar,
  IoIosPaper,
  IoIosCheckmarkCircle,
  RiBookletFill,
  RiPriceTagFill,
  FaUserFriends,
  FaTrash,
} = Icons;

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

const SideNavTabs: React.FC = () => {
  const navigate = useNavigate();
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const dispatch = useAppDispatch();

  const activateNotesTabHandler = () => {
    if (notes.length > 0) {
      const { title, text, id } = notes[0];
      dispatch(fillNoteEditor({ id }));
      navigate(`${NOTESPAGE}/${notes[0].id}`);
    } else {
      navigate(`${NOTESPAGE}/empty`);
    }
  };

  const navigateTrashHandler = () => {
    if (trashNotes.length > 0) {
      const firstTrashNote = trashNotes[0].note.id;
      navigate(`${TRASHPAGE}/${firstTrashNote}`);
    } else {
      navigate(`${TRASHPAGE}/empty`);
    }
  };

  return (
    <ul className='flex flex-col '>
      <SideNavTab tab={TAB_CONTENT.home} onClick={() => navigate(HOMEPAGE)} />
      <div className='flex flex-col'>
        <SideNavTab tab={TAB_CONTENT.shortcuts} />
        <SideNavTab tab={TAB_CONTENT.notes} onClick={activateNotesTabHandler} />
        <SideNavTab tab={TAB_CONTENT.tasks} />
        <SideNavTab tab={TAB_CONTENT.notebooks} className='mt-3' />
        <SideNavTab tab={TAB_CONTENT.tags} />
        <SideNavTab tab={TAB_CONTENT.sharedWithMe} />
        <SideNavTab
          tab={TAB_CONTENT.trash}
          className='mt-3'
          onClick={navigateTrashHandler}
        />
      </div>
      <DropdownList />
    </ul>
  );
};

export default SideNavTabs;
