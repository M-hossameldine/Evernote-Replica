import { useState } from 'react';

import Icons from '../../constants/Icons';
import SideNavTabs from './SideNavTabs';
import SideNavTab from './SideNavTab';
import SearchBar from './SearchBar';

const {
  BsSearch,
  BsPlus,
  FaUserCircle,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} = Icons;

const SideNavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const navBarClasses = '';

  return (
    <div
      className={`flex flex-col h-screen w-14 lg:w-56 bg-neutral-800 text-neutral-300`}
    >
      {/* Notes Navigator */}
      <div className='flex gap-3 text-neutral-400 pt-4 pb-2 lg:px-3'>
        <IoIosArrowBack className='text-lg shrink-0' />
        <IoIosArrowForward className='text-lg shrink-0' />
      </div>
      <div className='flex flex-col gap-2 p-3'>
        {/* User Profile */}
        <div className='flex gap-2'>
          <FaUserCircle className='text-3xl shrink-0' />
          <div className='flex items-center gap-1'>
            <small className='w-2/4 overflow-hidden scale-0 lg:scale-100 transition ease-out'>
              m.hossameldine@gmail.com
            </small>
            <IoIosArrowDown size='10' />
          </div>
        </div>

        {/* Add/Create Tab */}
        <div className='text-white py-[6px] px-2 rounded-3xl bg-green-550 hover:opacity-90'>
          <div className='flex items-center justify-evenly'>
            <BsPlus className='text-2xl shrink-0' />
            <span>New</span>
            <span className='ml-auto'>
              <IoIosArrowDown size='17' />
            </span>
          </div>
        </div>
      </div>

      <SearchBar />
      <SideNavTabs />
    </div>
  );
};

export default SideNavBar;
