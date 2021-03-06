import { useLocationIndicator } from '../../../hooks/use-locationIndicator';

import { BsSortDown, BiFilterAlt, MdViewList } from '../../../assets/index';

const NoteListingOptions: React.FC = (props) => {
  const location = useLocationIndicator();

  return (
    <div className='flex gap-2'>
      <BsSortDown size='22' className='shrink-0 cursor-pointer' />
      {!location.isInCurrentPath('trash') && (
        <BiFilterAlt size='22' className='shrink-0 cursor-pointer' />
      )}
      <MdViewList size='22' className='shrink-0 cursor-pointer' />
    </div>
  );
};

export default NoteListingOptions;
