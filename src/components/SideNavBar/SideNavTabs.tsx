import { useNavigate } from 'react-router-dom';
import { HOMEPAGE, NOTESPAGE } from '../../constants/routes';

import { NavTabModel } from '../../models/UI-Models';
import Icons from '../../constants/Icons';
import SideNavTab from './SideNavTab';
import DropdownList from '../UI/Dropdown';

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

  return (
    <ul className='flex flex-col '>
      <SideNavTab tab={TAB_CONTENT.home} onClick={() => navigate(HOMEPAGE)} />
      <div className='flex flex-col'>
        <SideNavTab tab={TAB_CONTENT.shortcuts} />
        <SideNavTab
          tab={TAB_CONTENT.notes}
          onClick={() => navigate(NOTESPAGE)}
        />
        <SideNavTab tab={TAB_CONTENT.tasks} />
        <SideNavTab tab={TAB_CONTENT.notebooks} className='mt-3' />
        <SideNavTab tab={TAB_CONTENT.tags} />
        <SideNavTab tab={TAB_CONTENT.sharedWithMe} />
        <SideNavTab tab={TAB_CONTENT.trash} className='mt-3' />
      </div>
      <DropdownList />
    </ul>
  );
};

export default SideNavTabs;
