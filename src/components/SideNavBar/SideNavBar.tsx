import { useState } from 'react';

import { FaUserCircle, IoIosArrowDown } from '../../assets/index';
import SideNavTabs from './SideNavTabs';
import AddNewNoteTab from './AddNewNoteTab';

const SideNavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const navBarClasses = '';

  return (
    <div
      className={`flex flex-col h-screen w-14 lg:w-56 bg-neutral-800 text-neutral-300`}
    >
      {/* sidebar header */}
      <header className='flex flex-col gap-2 p-3'>
        {/* User Profile */}
        <div className='flex gap-2 cursor-pointer'>
          <FaUserCircle className='text-3xl shrink-0' />
          <div className='flex items-center gap-1'>
            <small className='w-2/4 overflow-hidden scale-0 lg:scale-100 transition ease-out'>
              m.hossameldine@gmail.com
            </small>
            <IoIosArrowDown size='10' />
          </div>
        </div>

        {/* Add/Create Tab */}
        <AddNewNoteTab />
      </header>

      {/* <SearchBar /> */}
      <SideNavTabs />
    </div>
  );
};

export default SideNavBar;
