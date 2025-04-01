import {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  collection,
  db,
  setDoc,
  writeBatch,
} from '~libs/firebase';

import type {
  GetActiveNotesRequestResponse,
  GetActiveNotesEndpointParams,
  GetTrashNotesRequestResponse,
  GetTrashNotesEndpointParams,
  AddNoteEndpointParams,
  UpdateNoteEndpointParams,
  DeleteNoteEndpointParams,
  RestoreDeletedNoteEndpointParams,
  DeleteTrashNoteEndpointParams,
  ClearTrashNotesEndpointParams,
} from './notesApis.interfaces';
import type { Note, TrashNote } from '~modules/notes/domain/interfaces';
export const getActiveNotes = async ({
  defaultParams: { user },
}: GetActiveNotesEndpointParams): Promise<GetActiveNotesRequestResponse> => {
  const q = query(collection(db, 'users', user.id, 'active-notes'));
  const snapshot = await getDocs(q);

  // Transform QuerySnapshot to plain array
  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Note
  );
};

export const getTrashNotes = async ({
  defaultParams: { user },
}: GetTrashNotesEndpointParams): Promise<GetTrashNotesRequestResponse> => {
  const q = query(collection(db, 'users', user.id, 'trash-notes'));
  const snapshot = await getDocs(q);

  // Transform QuerySnapshot to plain array
  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as TrashNote
  );
};

export const addNote = async ({
  payload,
  defaultParams: { user },
}: AddNoteEndpointParams) => {
  const docRef = await addDoc(
    collection(db, 'users', user.id, 'active-notes'),
    payload
  );

  return { id: docRef.id, ...payload };
};

export const updateNote = async ({
  payload,
  extraParams: { noteId },
  defaultParams: { user },
}: UpdateNoteEndpointParams) => {
  await updateDoc(doc(db, 'users', user.id, 'active-notes', noteId), payload);

  return {
    ...payload,
    id: noteId,
  };
};

export const deleteNote = async ({
  extraParams: { noteId },
  defaultParams: { user },
}: DeleteNoteEndpointParams) => {
  // Get the note data before deleting
  const noteRef = doc(db, 'users', user.id, 'active-notes', noteId);
  const noteDoc = await getDoc(noteRef);
  const noteData = noteDoc.data();

  // Move to trash
  await setDoc(doc(db, 'users', user.id, 'trash-notes', noteId), {
    ...noteData,
    deletedTimestamp: new Date().toISOString(),
  });

  // Delete from active
  await deleteDoc(noteRef);

  return { id: noteId };
};

export const restoreDeletedNote = async ({
  extraParams: { noteId },
  defaultParams: { user },
}: RestoreDeletedNoteEndpointParams) => {
  // Get the note data before deleting
  const noteRef = doc(db, 'users', user.id, 'trash-notes', noteId);
  const noteDoc = await getDoc(noteRef);
  const noteData = noteDoc.data();

  if (noteData?.deletedTimestamp) {
    delete noteData.deletedTimestamp;
  }

  // Restore to active
  await setDoc(doc(db, 'users', user.id, 'active-notes', noteId), noteData);

  // Delete from trash
  await deleteDoc(doc(db, 'users', user.id, 'trash-notes', noteId));

  return { id: noteId };
};

export const deleteTrashNote = async ({
  extraParams: { noteId },
  defaultParams: { user },
}: DeleteTrashNoteEndpointParams) => {
  await deleteDoc(doc(db, 'users', user.id, 'trash-notes', noteId));

  return { id: noteId };
};

export const clearTrashNotes = async ({
  defaultParams: { user },
}: ClearTrashNotesEndpointParams) => {
  const trashRef = collection(db, 'users', user.id, 'trash-notes');
  const snapshot = await getDocs(trashRef);

  // If collection is empty, nothing to do
  if (snapshot.empty) {
    return { success: true };
  }

  const batch = writeBatch(db);
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  return { success: true };
};
