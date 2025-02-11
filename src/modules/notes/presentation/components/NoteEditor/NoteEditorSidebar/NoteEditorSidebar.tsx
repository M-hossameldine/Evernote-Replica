import {
  TRASH_ITEM_INTERFACE,
  HEADER_INTERFACE,
  FALLBACK_DATA_INTERFACE,
} from "interfaces";
import { Note } from "modules/notes/domain/interfaces/Note";

import NoteEditorSidebarHeader from "../NoteEditorSidebarHeader/NoteEditorSidebarHeader";
import NoteList from "../../NoteList/NoteList";
import FallbackMsg from "components/UI/FallbackMsg/FallbackMsg";

type NoteEditorSidebarProps = {
  notes: (Note | TRASH_ITEM_INTERFACE)[];
  header: HEADER_INTERFACE;
  fallbackData: FALLBACK_DATA_INTERFACE;
};

const NoteEditorSidebar = (
  props: NoteEditorSidebarProps,
): React.ReactElement => {
  const { notes, header, fallbackData } = props;

  return (
    <div className="flex h-screen min-w-[18rem] max-w-[24rem] flex-col bg-neutral-100">
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && <FallbackMsg fallbackData={fallbackData} />}
    </div>
  );
};

export default NoteEditorSidebar;
