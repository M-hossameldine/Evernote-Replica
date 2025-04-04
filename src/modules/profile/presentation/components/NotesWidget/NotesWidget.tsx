import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '~store';
import { selectActiveNotes } from '~modules/notes/data/local';
import { useAddNote } from '~modules/notes/presentation/hooks';

import Card from '~components/Cards/Card';
import DropdownMenu from '~components/DropdownMenu';
import { type SubmenuFunctionItemProps } from '~components/DropdownMenu/SubmenuFunctionItem';
import { AddNoteWrapper } from '~modules/notes/presentation/components/AddNoteWrapper';
import { NoteItem } from '~modules/notes/presentation/components/NoteItem/NoteItem';
import { AddNoteScreenLoading } from '~modules/notes/presentation/components/AddNoteWrapper/AddNoteScreenLoading';

import { MdPostAdd } from 'react-icons/md';
import { IoIosArrowForward, IoIosMore } from 'react-icons/io';

import { NotesRouteVariants } from '~constants';

type NotesWidgetProps = { className?: string };

export const NotesWidget = (props: NotesWidgetProps): React.ReactElement => {
  const notes = useAppSelector(selectActiveNotes);
  const navigate = useNavigate();

  const firstNote = notes?.length > 0 ? notes?.[0]?.id : 'empty';

  const { addNote, isLoading: addNoteLoading } = useAddNote();

  const dropdownData: SubmenuFunctionItemProps[] = [
    {
      id: uuid(),
      content: 'Go to notes',
      onClick: () => {
        navigate(NotesRouteVariants.activeNotes.pathname(firstNote));
      },
    },
    {
      id: uuid(),
      content: 'Create new note',
      onClick: () => {
        addNote();
      },
    },
  ];

  const notesWidgetClasses = props.className ? props.className : '';

  return (
    <Card className={` ${notesWidgetClasses} overflow-hidden`}>
      {addNoteLoading && <AddNoteScreenLoading />}

      <header className="flex items-center p-2">
        <Link
          to={NotesRouteVariants.activeNotes.pathname(firstNote)}
          className="flex items-center rounded p-1 uppercase text-neutral-800 hover:bg-neutral-100"
        >
          Notes
          <IoIosArrowForward
            size="14"
            className="mx-2 my-auto shrink-0 text-green-500"
          />
        </Link>

        <AddNoteWrapper className="ml-auto rounded p-1 hover:bg-neutral-100">
          <MdPostAdd size="20" className="shrink-0 text-neutral-600" />
        </AddNoteWrapper>

        <DropdownMenu
          menuHeader={{
            content: <IoIosMore />,
            className: 'text-neutral-500 hover:bg-neutral-100 rounded p-1',
          }}
          className="ml-2"
          submenuItemsData={dropdownData}
          placeSubmenu={{ x: 'end', y: 'bottom' }}
        />
      </header>

      {/* notes list */}
      <div className="scrollbar-box overflow-hidden overflow-x-scroll p-3">
        <ul className="flex gap-3">
          {notes.map((note, index) => (
            <li
              key={note.id}
              className="min-w-[11rem] rounded-md shadow-even-1"
            >
              <NoteItem
                note={note}
                index={index}
                className="p2"
                route={NotesRouteVariants.homeNote.pathname(note.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default NotesWidget;
