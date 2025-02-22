import { v4 as uuid } from 'uuid';
import { useAppSelector } from 'hooks';
import { useLogout } from 'modules/auth/data/remote/authApis';

import { selectUser } from 'modules/auth/data/local/authSlice';
import { FaUserCircle, IoIosArrowDown } from 'assets';
import DropdownMenu from 'components/DropdownMenu';
import { SideNavTabs } from './SideNavTabs';
import { AddNewNoteTab } from './AddNewNoteTab';

const SideNavBar: React.FC = () => {
  const userInfo = useAppSelector(selectUser);
  const [logoutMutation] = useLogout();

  return (
    <div
      className={`flex h-screen w-14 flex-col bg-neutral-800 text-neutral-300 lg:w-56`}
    >
      {/* sidebar header */}
      <header className="flex flex-col gap-2 p-3">
        {/* User Account */}
        <DropdownMenu
          menuHeader={{
            content: (
              <div className="flex cursor-pointer gap-2">
                <FaUserCircle className="shrink-0 text-3xl" />
                <div className="flex items-center gap-1">
                  <small className="w-2/4 scale-0 overflow-hidden transition ease-out lg:scale-100">
                    {userInfo?.email}
                  </small>
                  <IoIosArrowDown size="10" />
                </div>
              </div>
            ),
            className: 'max-w-full',
          }}
          submenuItemsData={[
            {
              id: uuid(),
              content: `Sign out ${userInfo?.email}`,
              onClick: () => {
                logoutMutation({});
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
