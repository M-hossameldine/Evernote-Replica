import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '../../../hooks';

import { logout } from '../../../store/shared-store';
import { FaUserCircle, IoIosArrowDown } from '../../../assets/index';
import { DropdownMenu, AddNewNoteTab, SideNavTabs } from '../../index';

const SideNavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useAppDispatch();

  const navBarClasses = '';

  return (
    <div
      className={`flex flex-col h-screen w-14 lg:w-56 bg-neutral-800 text-neutral-300`}
    >
      {/* sidebar header */}
      <header className='flex flex-col gap-2 p-3'>
        {/* User Account */}
        <DropdownMenu
          menuHeader={{
            content: (
              <div className='flex gap-2 cursor-pointer'>
                <FaUserCircle className='text-3xl shrink-0' />
                <div className='flex items-center gap-1'>
                  <small className='w-2/4 overflow-hidden scale-0 lg:scale-100 transition ease-out'>
                    m.hossameldine@gmail.com
                  </small>
                  <IoIosArrowDown size='10' />
                </div>
              </div>
            ),
          }}
          submenuItemsData={[
            {
              id: uuid(),
              content: 'Sign out designer.m.hossam@gmail.com',
              onClick: () => {
                dispatch(logout());
              },
            },
          ]}
          placeSubmenu={{}}
        />

        {/* Add/Create Tab */}
        <AddNewNoteTab />
      </header>

      {/* <SearchBar /> */}
      <SideNavTabs />
    </div>
  );
};

export default SideNavBar;
