import { NOTE_INTERFACE } from './note-interface';

export interface TRASH_ITEM_INTERFACE {
  note: NOTE_INTERFACE;
  deleteTimestamp: string;
}

export interface TRASH_STATE_INTERFACE {
  notes: TRASH_ITEM_INTERFACE[];
}
