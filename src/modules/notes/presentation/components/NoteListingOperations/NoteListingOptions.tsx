import { useLocationIndicator } from '~hooks';

import { BiFilterAlt, BsSortDown, MdViewList } from '~assets';

const NoteListingOptions: React.FC = () => {
  const location = useLocationIndicator();

  return (
    <div className="flex gap-2">
      <BsSortDown size="22" className="shrink-0 cursor-pointer" />
      {!location.isInCurrentPath('trash') && (
        <BiFilterAlt size="22" className="shrink-0 cursor-pointer" />
      )}
      <MdViewList size="22" className="shrink-0 cursor-pointer" />
    </div>
  );
};

export default NoteListingOptions;
