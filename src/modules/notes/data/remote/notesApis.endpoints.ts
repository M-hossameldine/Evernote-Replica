import { getDocs, addDoc, query, collection, db } from '~libs/firebase';

import type {
  GetActiveNotesRequestResponse,
  GetActiveNotesEndpointParams,
  GetTrashNotesRequestResponse,
  GetTrashNotesEndpointParams,
  AddNoteEndpointParams,
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
