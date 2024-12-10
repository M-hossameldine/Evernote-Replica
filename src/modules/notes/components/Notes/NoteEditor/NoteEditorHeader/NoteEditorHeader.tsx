import NoteActionsDropdown from "../NoteActions/NoteActionsDropdown";

const NoteEditorHeader: React.FC = () => {
  return (
    <header className="h-[6.2rem] bg-neutral-100 border-l-[1px] border-b-[1px] border-neutral-300 px-3 py-3 text-neutral-400">
      <div className="flex items-center">
        <p>Left side</p>
        <p className="ml-auto text-sm pr-6">Only you</p>
        <button className="text-white bg-green-550 hover:bg-green-700 text-sm px-4 py-2 mr-2 rounded">
          Share
        </button>
        <NoteActionsDropdown />
      </div>
      <div className=""></div>
    </header>
  );
};

export default NoteEditorHeader;
