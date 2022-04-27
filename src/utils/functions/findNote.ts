export const findNoteById = (notes: any[], id: string) =>
  notes.find((note) => note.id === id);
