import SideNavTab from './SideNavTab';
import { NavTabModel } from '../../models/UI-Models';
import Icons from '../../constants/Icons';

const { BsSearch } = Icons;

const SEARCH_TAB = new NavTabModel('Search', BsSearch);

const SearchBar: React.FC = (props) => {
  return (
    <SideNavTab
      tab={SEARCH_TAB}
      className='bg-neutral-600 rounded-3xl w-full lg:w-[90%] aspect-square mx-auto pl-0'
      textStyle='cursor-text grow '
      iconStyle=''
    />
  );
};

export default SearchBar;
