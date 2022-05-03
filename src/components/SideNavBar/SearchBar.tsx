import SideNavTab from './SideNavTab';
import { NavTabModel } from '../../models/UI-Models';
import { BsSearch } from '../../assets/index';

const SEARCH_TAB = new NavTabModel('Search', BsSearch);

const SearchBar: React.FC = (props) => {
  return (
    <SideNavTab
      tab={SEARCH_TAB}
      className='bg-neutral-600 rounded-3xl lg:w-[90%] aspect-square mx-auto pl-0'
      textStyle='cursor-text grow '
      iconStyle='text-base lg:text-lg'
    />
  );
};

export default SearchBar;
