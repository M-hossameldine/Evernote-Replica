export const findNoteById = (notes: [{ id: string }], id: string) =>
  notes.find((note) => note.id === id);
