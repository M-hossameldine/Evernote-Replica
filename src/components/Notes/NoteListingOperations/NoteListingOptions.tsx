import { useTrashIndicator } from '../../../hooks/use-trashIndicator';

import Icons from '../../../constants/Icons';

const { BsSortDown, BiFilterAlt, MdViewList } = Icons;

const NoteListingOptions: React.FC = (props) => {
  const isTrashBin = useTrashIndicator();

  return (
    <div className='flex gap-2'>
      <BsSortDown size='22' className='shrink-0 cursor-pointer' />
      {!(isTrashBin === 'trash') && (
        <BiFilterAlt size='22' className='shrink-0 cursor-pointer' />
      )}
      <MdViewList size='22' className='shrink-0 cursor-pointer' />
    </div>
  );
};

export default NoteListingOptions;
