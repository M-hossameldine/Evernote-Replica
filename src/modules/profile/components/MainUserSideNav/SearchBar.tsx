import SideNavTab from "./SideNavTab";
import { NavTabModel } from "models/UI-Models";
import { BsSearch } from "assets/index";

const SEARCH_TAB = new NavTabModel("Search", BsSearch);

const SearchBar: React.FC = () => {
  return (
    <SideNavTab
      tab={SEARCH_TAB}
      className="mx-auto aspect-square rounded-3xl bg-neutral-600 pl-0 lg:w-[90%]"
      textStyle="cursor-text grow "
      iconStyle="text-base lg:text-lg"
    />
  );
};

export default SearchBar;
